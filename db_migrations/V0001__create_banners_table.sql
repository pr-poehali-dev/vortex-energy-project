CREATE TABLE banners (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url VARCHAR(500),
  ref_url VARCHAR(500) NOT NULL,
  rate VARCHAR(100),
  amount VARCHAR(100),
  term VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO banners (title, description, logo_url, ref_url, rate, amount, term, sort_order) VALUES
('МФО Пример 1', 'Займы без отказа, решение за 5 минут', '', 'https://example.com/ref1', 'от 0.5% в день', 'до 30 000 ₽', 'до 30 дней', 1),
('МФО Пример 2', 'Первый займ под 0%', '', 'https://example.com/ref2', '0% первый займ', 'до 15 000 ₽', 'до 21 дня', 2);
