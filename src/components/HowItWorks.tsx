const steps = [
  {
    number: "01",
    title: "Оставьте заявку",
    description:
      "Заполните короткую форму онлайн — только паспорт и телефон. Никаких справок о доходах и визитов в офис.",
  },
  {
    number: "02",
    title: "Получите решение",
    description:
      "Автоматическая проверка занимает от 1 до 5 минут. Решение приходит на телефон в виде СМС или звонка.",
  },
  {
    number: "03",
    title: "Деньги на карту",
    description:
      "После одобрения деньги поступают на вашу карту любого банка. Моментально, круглосуточно, без выходных.",
  },
  {
    number: "04",
    title: "Верните удобно",
    description:
      "Погасите займ в приложении, на сайте или через банкомат. Досрочное погашение — без штрафов.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 border-t border-white/10 relative z-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-4">Процесс</p>
          <h2 className="text-4xl md:text-5xl font-sentient">
            Как это <i className="font-light">работает</i>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden max-w-6xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-background p-8 flex flex-col gap-6 hover:bg-white/5 transition-colors duration-300 group"
            >
              <span className="font-mono text-4xl font-bold text-primary/30 group-hover:text-primary/60 transition-colors duration-300">
                {step.number}
              </span>
              <div>
                <h3 className="font-sentient text-xl mb-3">{step.title}</h3>
                <p className="font-mono text-xs text-foreground/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}