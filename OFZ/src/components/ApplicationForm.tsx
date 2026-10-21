import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  FilePlus2,
  FileSpreadsheet,
  FileText,
  FileImage,
  File as FileIcon,
  Loader2,
  RotateCcw,
  Trash2,
} from "lucide-react";
import teamImg from "@/assets/team.jpg";
import { Reveal } from "./Reveal";
import { cn } from "@/utils/cn";

/* ---------- helpers ---------- */

const MAX_FILES = 5;
const MAX_SIZE = 1.2 * 1024 * 1024; // 1.2 MB

type UploadStatus = "uploading" | "done" | "error";

type UploadFile = {
  id: string;
  name: string;
  size: number;
  status: UploadStatus;
  progress: number;
  error?: string;
};

function formatSize(bytes: number) {
  if (bytes <= 0) return "0 KB";
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1).replace(/\.0$/, "")} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function kindOf(name: string) {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (["xls", "xlsx", "csv"].includes(ext)) return { label: "Таблица Excel", Icon: FileSpreadsheet };
  if (["png"].includes(ext)) return { label: "Изображение PNG", Icon: FileImage };
  if (["jpg", "jpeg", "webp", "gif"].includes(ext)) return { label: `Изображение ${ext.toUpperCase()}`, Icon: FileImage };
  if (ext === "pdf") return { label: "Документ PDF", Icon: FileText };
  if (["doc", "docx", "rtf", "txt"].includes(ext)) return { label: "Документ", Icon: FileText };
  if (["ppt", "pptx", "key"].includes(ext)) return { label: "Презентация", Icon: FileText };
  if (["zip", "rar", "7z"].includes(ext)) return { label: "Архив", Icon: FileIcon };
  return { label: "Файл", Icon: FileIcon };
}

function pluralFiles(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "файл";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "файла";
  return "файлов";
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
  if (!digits) return "";
  const d = digits.startsWith("7") ? digits : `7${digits}`;
  let out = "+7";
  if (d.length > 1) out += ` (${d.slice(1, 4)}`;
  if (d.length >= 4) out += ")";
  if (d.length > 4) out += ` ${d.slice(4, 7)}`;
  if (d.length > 7) out += `-${d.slice(7, 9)}`;
  if (d.length > 9) out += `-${d.slice(9, 11)}`;
  return out;
}

/* ---------- component ---------- */

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  task: string;
  consent: boolean;
};

const initialForm: FormState = { name: "", company: "", email: "", phone: "", task: "", consent: false };

export function ApplicationForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragging, setDragging] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const timers = useRef<Map<string, number>>(new Map());
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const map = timers.current;
    return () => map.forEach((t) => window.clearInterval(t));
  }, []);

  useEffect(() => {
    if (!hint) return;
    const t = window.setTimeout(() => setHint(null), 3200);
    return () => window.clearTimeout(t);
  }, [hint]);

  const startUpload = useCallback((id: string) => {
    const existing = timers.current.get(id);
    if (existing) window.clearInterval(existing);
    const timer = window.setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id !== id || f.status !== "uploading") return f;
          const next = Math.min(100, f.progress + 8 + Math.random() * 18);
          if (next >= 100) {
            window.clearInterval(timer);
            timers.current.delete(id);
            return { ...f, progress: 100, status: "done" };
          }
          return { ...f, progress: next };
        }),
      );
    }, 180);
    timers.current.set(id, timer);
  }, []);

  const addFiles = useCallback(
    (list: FileList | File[]) => {
      const incoming = Array.from(list);
      if (!incoming.length) return;
      setFiles((prev) => {
        const room = MAX_FILES - prev.length;
        if (room <= 0) {
          setHint(`Можно прикрепить не более ${MAX_FILES} файлов`);
          return prev;
        }
        const accepted = incoming.slice(0, room);
        if (incoming.length > room) setHint(`Добавлены только первые ${room} ${pluralFiles(room)}`);
        const created: UploadFile[] = accepted.map((file) => {
          const id = `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
          const tooBig = file.size > MAX_SIZE;
          return {
            id,
            name: file.name,
            size: file.size,
            status: tooBig ? "error" : "uploading",
            progress: tooBig ? 0 : 4,
            error: tooBig ? "Превышен размер" : undefined,
          };
        });
        created.filter((f) => f.status === "uploading").forEach((f) => startUpload(f.id));
        return [...prev, ...created];
      });
    },
    [startUpload],
  );

  const removeFile = (id: string) => {
    const t = timers.current.get(id);
    if (t) window.clearInterval(t);
    timers.current.delete(id);
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const retryFile = (id: string) => {
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status: "uploading", progress: 4, error: undefined } : f)));
    startUpload(id);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = "Укажите, как к вам обращаться";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Введите корректный e-mail";
    if (form.task.trim().length < 10) next.task = "Опишите задачу чуть подробнее";
    if (!form.consent) next.consent = "Необходимо согласие на обработку данных";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setSent(true);
    }, 1400);
  };

  const reset = () => {
    setForm(initialForm);
    setFiles([]);
    setErrors({});
    setSent(false);
  };

  const doneCount = files.filter((f) => f.status === "done").length;
  const uploadingCount = files.filter((f) => f.status === "uploading").length;
  const totalSize = files.reduce((acc, f) => acc + f.size, 0);

  return (
    <section id="form" className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="blob absolute -left-32 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-brand-400/15" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left: copy + photo */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-brand-600/15 bg-brand-50 px-3.5 py-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-700">
                Заявка
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-[-0.02em] text-ink-900 sm:text-4xl md:text-5xl">
                Заполните анкету
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-ink-900/60 md:text-lg">
                Расскажите о задаче — мы передадим её в профильный институт и вернёмся с предложением по команде.
              </p>
            </Reveal>

            <Reveal delay={240} variant="zoom" className="relative mt-10">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-500/20 via-transparent to-brand-500/10" />
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-ink-900/5 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.45)] sm:aspect-[5/6]">
                <img
                  src={teamImg}
                  alt="Команда студентов обсуждает проект"
                  className="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3.5 backdrop-blur-xl">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
                    <Clock3 className="h-5 w-5" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-[14px] font-bold text-white">Ответим в течение 2 рабочих дней</span>
                    <span className="block text-[12px] text-white/70">подберём команду под вашу задачу</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: form card */}
          <Reveal delay={120} variant="right">
            <div className="relative rounded-[2rem] border border-ink-900/6 bg-white p-6 shadow-[0_30px_80px_-40px_rgb(0_0_0/0.3)] sm:p-8 md:p-10">
              {sent ? (
                <SuccessState onReset={reset} name={form.name} />
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-7">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Как вас зовут?" error={errors.name} htmlFor="f-name">
                      <input
                        id="f-name"
                        className={cn("field", errors.name && "border-red-400 ring-4 ring-red-500/10")}
                        placeholder="Иванов Иван"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Название организации" htmlFor="f-company">
                      <input
                        id="f-company"
                        className="field"
                        placeholder='ООО "Ромашка"'
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                        autoComplete="organization"
                      />
                    </Field>
                    <Field label="E-mail" error={errors.email} htmlFor="f-email">
                      <input
                        id="f-email"
                        type="email"
                        className={cn("field", errors.email && "border-red-400 ring-4 ring-red-500/10")}
                        placeholder="ivanov_ivan@mail.ru"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        autoComplete="email"
                        inputMode="email"
                      />
                    </Field>
                    <Field label="Телефон" htmlFor="f-phone">
                      <input
                        id="f-phone"
                        type="tel"
                        className="field"
                        placeholder="+7 (999) 000-00-00"
                        value={form.phone}
                        onChange={(e) => update("phone", formatPhone(e.target.value))}
                        autoComplete="tel"
                        inputMode="tel"
                      />
                    </Field>
                  </div>

                  <Field label="Описание задачи" error={errors.task} htmlFor="f-task">
                    <textarea
                      id="f-task"
                      rows={4}
                      className={cn("field min-h-[120px] resize-y", errors.task && "border-red-400 ring-4 ring-red-500/10")}
                      placeholder="Опишите задачу..."
                      value={form.task}
                      onChange={(e) => update("task", e.target.value)}
                    />
                  </Field>

                  {/* Dropzone */}
                  <div>
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => inputRef.current?.click()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          inputRef.current?.click();
                        }
                      }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                      }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={onDrop}
                      className={cn(
                        "group relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border-2 border-dashed px-5 py-5 transition-all duration-300",
                        dragging
                          ? "border-brand-500 bg-brand-50 ring-4 ring-brand-500/15"
                          : "border-ink-900/12 bg-zinc-50 hover:border-brand-500/60 hover:bg-brand-50/50",
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-white text-ink-900/70 transition-all duration-300",
                          dragging ? "border-brand-500 text-brand-600" : "border-ink-900/10 group-hover:border-brand-500/40 group-hover:text-brand-600",
                        )}
                      >
                        <FilePlus2 className="h-5 w-5" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-[15px] font-semibold text-ink-900">
                          {dragging ? "Отпустите, чтобы добавить" : "Перетащите файлы сюда"}
                          <span className="hidden font-normal text-ink-900/50 sm:inline"> или нажмите для выбора</span>
                        </span>
                        <span className="text-[12px] text-ink-900/45">Максимальный размер: 1.2 MB · до {MAX_FILES} файлов</span>
                      </span>
                      <input
                        ref={inputRef}
                        type="file"
                        multiple
                        className="sr-only"
                        onChange={onInputChange}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg,.zip,.txt"
                      />
                    </div>

                    {hint && (
                      <p className="mt-2 flex items-center gap-1.5 text-[12px] font-medium text-amber-600 animate-fade-up">
                        <AlertCircle className="h-3.5 w-3.5" /> {hint}
                      </p>
                    )}

                    {files.length > 0 && (
                      <ul className="mt-3 flex flex-col gap-2">
                        {files.map((f) => (
                          <FileRow key={f.id} file={f} onRemove={() => removeFile(f.id)} onRetry={() => retryFile(f.id)} />
                        ))}
                      </ul>
                    )}

                    <div className="mt-3 flex items-center justify-between text-[12px]">
                      <span className="text-ink-900/45">
                        {files.length} из {MAX_FILES} файлов · {formatSize(totalSize)}
                      </span>
                      {uploadingCount > 0 ? (
                        <span className="inline-flex items-center gap-1.5 text-ink-900/50">
                          <Loader2 className="h-3.5 w-3.5 animate-spin-slow" /> Загрузка…
                        </span>
                      ) : doneCount > 0 ? (
                        <span className="font-semibold text-brand-700">
                          {doneCount} {pluralFiles(doneCount)} {doneCount === 1 ? "добавлен" : "добавлено"}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 border-t border-ink-900/6 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <label className="group flex cursor-pointer items-start gap-3 select-none">
                      <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={form.consent}
                          onChange={(e) => update("consent", e.target.checked)}
                        />
                        <span
                          className={cn(
                            "absolute inset-0 rounded-md border-2 transition-all duration-300 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-500/20",
                            form.consent ? "border-brand-600 bg-brand-600" : "border-ink-900/25 bg-white group-hover:border-brand-500",
                            errors.consent && !form.consent && "border-red-400",
                          )}
                        />
                        <Check
                          className={cn(
                            "relative h-3.5 w-3.5 text-white transition-all duration-300",
                            form.consent ? "scale-100 opacity-100" : "scale-50 opacity-0",
                          )}
                          strokeWidth={3}
                        />
                      </span>
                      <span className="text-[13px] leading-snug text-ink-900/70">
                        Я согласен на обработку персональных данных
                        {errors.consent && <span className="mt-0.5 block text-[12px] font-medium text-red-500">{errors.consent}</span>}
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group relative inline-flex shrink-0 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-brand-600 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_18px_40px_-14px_rgb(0_166_81/0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-wait disabled:opacity-80 disabled:hover:translate-y-0"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin-slow" /> Отправляем…
                        </>
                      ) : (
                        <>
                          Отправить
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- sub-components ---------- */

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[14px] font-bold text-ink-900">
        {label}
      </label>
      {children}
      {error && (
        <span className="flex items-center gap-1.5 text-[12px] font-medium text-red-500 animate-fade-up">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </span>
      )}
    </div>
  );
}

function FileRow({ file, onRemove, onRetry }: { file: UploadFile; onRemove: () => void; onRetry: () => void }) {
  const { label, Icon } = kindOf(file.name);
  const isError = file.status === "error";
  const isDone = file.status === "done";

  return (
    <li
      className={cn(
        "relative flex items-center gap-3 overflow-hidden rounded-xl border px-3.5 py-3 transition-all duration-300 animate-fade-up",
        isError ? "border-red-200 bg-red-50/70" : "border-ink-900/8 bg-white",
      )}
    >
      {file.status === "uploading" && (
        <span
          className="absolute inset-y-0 left-0 bg-brand-500/8 transition-[width] duration-300"
          style={{ width: `${file.progress}%` }}
        />
      )}
      <span
        className={cn(
          "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          isError ? "bg-red-100 text-red-500" : isDone ? "bg-brand-50 text-brand-600" : "bg-zinc-100 text-ink-900/60",
        )}
      >
        <Icon className="h-4.5 w-4.5" />
      </span>
      <span className="relative min-w-0 flex-1">
        <span className="block truncate text-[13.5px] font-semibold text-ink-900">{file.name}</span>
        <span className="block text-[12px] text-ink-900/45">{label}</span>
      </span>
      <span className="relative hidden text-[12px] text-ink-900/45 sm:block">{formatSize(file.size)}</span>
      <span className="relative flex w-[7.5rem] items-center justify-end gap-1.5 text-[12px]">
        {isError && (
          <span className="inline-flex items-center gap-1 font-medium text-red-500">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> {file.error ?? "Нет соединения"}
          </span>
        )}
        {file.status === "uploading" && (
          <span className="inline-flex items-center gap-1.5 text-ink-900/50">
            <Loader2 className="h-3.5 w-3.5 animate-spin-slow" /> {Math.round(file.progress)}%
          </span>
        )}
        {isDone && (
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <Check className="h-4 w-4" strokeWidth={2.5} />
          </span>
        )}
      </span>
      <span className="relative flex items-center gap-1">
        {isError && file.error !== "Превышен размер" && (
          <button
            type="button"
            onClick={onRetry}
            aria-label="Повторить загрузку"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/8 bg-white text-ink-900/60 transition-colors hover:border-brand-500/40 hover:text-brand-600"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          aria-label="Удалить файл"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-900/8 bg-white text-ink-900/60 transition-colors hover:border-red-300 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </span>
    </li>
  );
}

function SuccessState({ onReset, name }: { onReset: () => void; name: string }) {
  const firstName = name.trim().split(/\s+/).find((p) => p.length > 1) ?? "";
  return (
    <div className="flex flex-col items-center py-10 text-center animate-fade-up">
      <span className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-brand-500/20 animate-ping-slow" />
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-brand-600 text-white shadow-[0_20px_40px_-14px_rgb(0_166_81/0.9)]">
          <CheckCircle2 className="h-9 w-9" />
        </span>
      </span>
      <h3 className="mt-7 text-2xl font-extrabold tracking-[-0.02em] text-ink-900 md:text-3xl">Заявка отправлена!</h3>
      <p className="mt-3 max-w-md text-pretty text-[15px] leading-relaxed text-ink-900/60">
        {firstName ? `${firstName}, спасибо!` : "Спасибо!"} Мы передадим задачу в профильный институт и ответим в срок до 2
        рабочих дней.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink-900/10 px-5 py-2.5 text-[14px] font-semibold text-ink-900 transition-colors hover:border-brand-500/40 hover:text-brand-700"
      >
        Отправить ещё одну
      </button>
    </div>
  );
}
