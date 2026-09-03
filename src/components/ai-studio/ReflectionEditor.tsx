import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";
import { Loader2 } from "lucide-react";

interface ReflectionEditorProps {
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
  disabled?: boolean;
  onGenerate?: () => void;
}

const EXAMPLES = {
  es: [
    "Hoy entendí que dejar ir también puede ser una forma de amar.",
    "Durante años pensé que debía demostrar mi valor.",
    "El miedo desaparece cuando decides avanzar igualmente.",
    "Quiero escribir sobre la importancia del perdón.",
    "Necesito expresar una emoción que todavía no logro entender.",
  ],

  en: [
    "Today I understood that letting go can also be a way of loving.",
    "For years I thought I had to prove my worth.",
    "Fear disappears when you decide to move forward anyway.",
    "I want to write about the importance of forgiveness.",
    "I need to express an emotion I still cannot understand.",
  ],

  fr: [
    "Aujourd’hui, j’ai compris que laisser partir peut aussi être une forme d’amour.",
    "Pendant des années, j’ai pensé devoir prouver ma valeur.",
    "La peur disparaît lorsque l’on décide d’avancer malgré tout.",
    "Je veux écrire sur l’importance du pardon.",
    "J’ai besoin d’exprimer une émotion que je ne parviens pas encore à comprendre.",
  ],

  pt: [
    "Hoje entendi que deixar ir também pode ser uma forma de amar.",
    "Durante anos pensei que precisava provar o meu valor.",
    "O medo desaparece quando você decide seguir em frente mesmo assim.",
    "Quero escrever sobre a importância do perdão.",
    "Preciso expressar uma emoção que ainda não consigo compreender.",
  ],
} as const;

export function ReflectionEditor({
  value,
  onChange,
  loading = false,
  disabled = false,
  onGenerate,
}: ReflectionEditorProps) {
  const { language, t } = useLanguage();

  const reflectionText = t.aiStudio.reflection;
  const examples = EXAMPLES[language];

  const characters = value.length;

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 backdrop-blur-xl">
      <header className="mb-8">
        <span className="text-xs uppercase tracking-[0.25em] text-violet-400">
          DREVAIA AI
        </span>

        <h2 className="mt-3 text-4xl font-bold tracking-tight text-white">
          {reflectionText.title}
        </h2>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-400">
          {reflectionText.description}
        </p>
      </header>

      <Textarea
        id="reflection"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={reflectionText.placeholder}
        disabled={disabled}
        className="
          min-h-[260px]
          resize-none
          rounded-3xl
          border-zinc-700
          bg-black/30
          p-8
          text-lg
          leading-9
          text-white
          placeholder:text-zinc-500
          transition-all
          duration-300
          focus:border-violet-500
          focus:ring-2
          focus:ring-violet-500/30
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      />

      <div className="mt-6 flex flex-wrap gap-3">
        {examples.map((example) => (
          <button
            key={example}
            type="button"
            disabled={disabled}
            onClick={() => onChange(example)}
            className="
              rounded-full
              border
              border-zinc-700
              bg-zinc-900
              px-4
              py-2
              text-sm
              text-zinc-300
              transition-all
              duration-200
              hover:border-violet-500
              hover:bg-violet-500/10
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            ✦ {example}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-zinc-500">
            {reflectionText.helper}
          </p>

          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
            {characters} {reflectionText.characters}
          </p>
        </div>

        {onGenerate && (
          <Button
            type="button"
            size="lg"
            disabled={disabled || loading || !value.trim()}
            onClick={onGenerate}
            className="
              min-w-[240px]
              transition-all
              duration-300
            "
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {reflectionText.creating}
              </>
            ) : (
              <>✦ {reflectionText.generate}</>
            )}
          </Button>
        )}
      </div>

      {loading && (
        <div
          className="
            mt-6
            flex
            items-center
            justify-center
            gap-3
            rounded-2xl
            border
            border-violet-500/20
            bg-violet-500/5
            px-5
            py-4
            text-sm
            text-violet-200
          "
          aria-live="polite"
        >
          <Loader2 className="h-4 w-4 animate-spin text-violet-400" />

          <span>
            {reflectionText.creating}
          </span>

          <span className="text-zinc-500">
            ·
          </span>

          <span className="text-zinc-400">
            DREVAIA AI está procesando tu reflexión…
          </span>
        </div>
      )}
    </section>
  );
}