import { useEffect, useState } from "react";
import func2url from "../../backend/func2url.json";

interface Banner {
  id: number;
  title: string;
  description: string;
  logo_url: string;
  ref_url: string;
  rate: string;
  amount: string;
  term: string;
}

export function BannersSection() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(func2url.banners)
      .then((r) => r.json())
      .then((data) => {
        const parsed = typeof data === "string" ? JSON.parse(data) : data;
        setBanners(parsed.banners || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="apply" className="py-24 container mx-auto px-4">
        <div className="text-center text-foreground/40 font-mono text-sm">Загрузка...</div>
      </section>
    );
  }

  if (banners.length === 0) return null;

  return (
    <section id="apply" className="py-24 container mx-auto px-4">
      <div className="text-center mb-14">
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 mb-4">Партнёры</p>
        <h2 className="text-4xl md:text-5xl font-sentient">
          Выберите <i className="font-light">займ</i>
        </h2>
        <p className="font-mono text-sm text-foreground/50 mt-4 max-w-md mx-auto">
          Проверенные МФО — оформление онлайн за несколько минут
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {banners.map((banner) => (
          <a
            key={banner.id}
            href={banner.ref_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-white/10 rounded-2xl p-6 hover:border-primary/60 transition-all duration-300 hover:bg-white/5 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative">
              {banner.logo_url ? (
                <img src={banner.logo_url} alt={banner.title} className="h-10 mb-5 object-contain" />
              ) : (
                <div className="h-10 mb-5 flex items-center">
                  <span className="font-sentient text-xl font-semibold">{banner.title}</span>
                </div>
              )}

              {banner.description && (
                <p className="font-mono text-xs text-foreground/50 mb-5 leading-relaxed">
                  {banner.description}
                </p>
              )}

              <div className="grid grid-cols-3 gap-3 mb-6">
                {banner.rate && (
                  <div className="text-center">
                    <div className="text-primary font-mono text-xs font-semibold">{banner.rate}</div>
                    <div className="text-foreground/40 font-mono text-[10px] mt-1 uppercase tracking-wide">Ставка</div>
                  </div>
                )}
                {banner.amount && (
                  <div className="text-center">
                    <div className="text-foreground font-mono text-xs font-semibold">{banner.amount}</div>
                    <div className="text-foreground/40 font-mono text-[10px] mt-1 uppercase tracking-wide">Сумма</div>
                  </div>
                )}
                {banner.term && (
                  <div className="text-center">
                    <div className="text-foreground font-mono text-xs font-semibold">{banner.term}</div>
                    <div className="text-foreground/40 font-mono text-[10px] mt-1 uppercase tracking-wide">Срок</div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-primary group-hover:text-primary/80 transition-colors">
                  Получить займ →
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
