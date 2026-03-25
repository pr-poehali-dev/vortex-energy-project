import Icon from "@/components/ui/icon";

export function Contacts() {
  return (
    <section id="contact" className="py-24 border-t border-white/10">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-4">Контакты</p>
        <h2 className="text-4xl md:text-5xl font-sentient mb-4">
          Свяжитесь <i className="font-light">с нами</i>
        </h2>
        <p className="font-mono text-sm text-foreground/50 mb-12">
          Ответим на любые вопросы — выберите удобный способ
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
          <a
            href="mailto:dansinakov@gmail.com"
            className="group flex items-center gap-4 border border-white/10 rounded-xl px-6 py-5 hover:border-primary/50 hover:bg-white/5 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <Icon name="Mail" size={18} className="text-foreground/60 group-hover:text-primary transition-colors" />
            </div>
            <div className="text-left">
              <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/40 mb-0.5">Email</div>
              <div className="font-mono text-sm text-foreground group-hover:text-primary transition-colors">dansinakov@gmail.com</div>
            </div>
          </a>

          <a
            href="https://t.me/tocahing"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 border border-white/10 rounded-xl px-6 py-5 hover:border-primary/50 hover:bg-white/5 transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <Icon name="Send" size={18} className="text-foreground/60 group-hover:text-primary transition-colors" />
            </div>
            <div className="text-left">
              <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/40 mb-0.5">Telegram</div>
              <div className="font-mono text-sm text-foreground group-hover:text-primary transition-colors">@tocahing</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
