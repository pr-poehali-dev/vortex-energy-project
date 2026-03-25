import { GL } from "./gl";
import { Pill } from "./Pill";
import { Button } from "./ui/button";
import { useState } from "react";
import { Header } from "./Header";

export function Hero() {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="flex flex-col min-h-svh justify-between relative z-10">
      <GL hovering={hovering} />
      <Header />

      <div className="pb-16 mt-auto text-center relative">
        <Pill className="mb-6">ДО 30 000 ₽ ЗА 5 МИНУТ</Pill>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">
          Деньги прямо <br />
          <i className="font-light">сейчас</i>
        </h1>
        <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[440px] mx-auto">
          Быстрое оформление онлайн без справок и визита в офис — решение за 5 минут
        </p>

        <a className="contents max-sm:hidden" href="#apply">
          <Button
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Получить займ]
          </Button>
        </a>
        <a className="contents sm:hidden" href="#apply">
          <Button
            size="sm"
            className="mt-14"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            [Получить займ]
          </Button>
        </a>
      </div>
    </div>
  );
}