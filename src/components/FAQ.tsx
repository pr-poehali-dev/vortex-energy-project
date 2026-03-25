import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Кто может получить микрозайм?",
    a: "Любой гражданин РФ в возрасте от 18 лет с паспортом и действующим номером телефона. Кредитная история и справки о доходах не требуются.",
  },
  {
    q: "Сколько времени занимает одобрение?",
    a: "Решение принимается автоматически за 1–5 минут. Деньги поступают на карту сразу после подписания договора — как правило, в течение нескольких минут.",
  },
  {
    q: "Какую сумму можно получить?",
    a: "Сумма зависит от выбранной МФО и вашего профиля. Как правило, новым клиентам доступно до 15 000 ₽, постоянным — до 100 000 ₽.",
  },
  {
    q: "Можно ли получить займ с плохой кредитной историей?",
    a: "Да. Многие МФО работают с клиентами с испорченной кредитной историей или без неё. Вероятность одобрения выше, чем в банке.",
  },
  {
    q: "Как вернуть займ досрочно?",
    a: "Досрочное погашение доступно в любой момент через приложение или сайт МФО. Штрафы за досрочное погашение не взимаются — вы платите только за фактические дни пользования.",
  },
  {
    q: "Безопасно ли оформлять займ онлайн?",
    a: "Все МФО в нашем каталоге имеют лицензию Банка России и работают в соответствии с законодательством. Ваши данные передаются по защищённому каналу.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 border-t border-white/10">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-4">Вопросы</p>
          <h2 className="text-4xl md:text-5xl font-sentient">
            Частые <i className="font-light">вопросы</i>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-white/10 rounded-xl px-6 hover:border-white/20 transition-colors duration-200"
            >
              <AccordionTrigger className="font-sentient text-base text-left hover:no-underline py-5">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="font-mono text-xs text-foreground/50 leading-relaxed pb-5">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
