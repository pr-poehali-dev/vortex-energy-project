import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import func2url from "../../backend/func2url.json";

interface Banner {
  id?: number;
  title: string;
  description: string;
  logo_url: string;
  ref_url: string;
  rate: string;
  amount: string;
  term: string;
  is_active: boolean;
  sort_order: number;
}

const empty: Banner = {
  title: "",
  description: "",
  logo_url: "",
  ref_url: "",
  rate: "",
  amount: "",
  term: "",
  is_active: true,
  sort_order: 0,
};

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [editing, setEditing] = useState<Banner | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    "X-Admin-Token": password,
  };

  const load = async (pwd: string) => {
    const r = await fetch(func2url.banners, { headers: { "X-Admin-Token": pwd, "X-Admin-Mode": "true" } });
    if (r.status === 401) { setError("Неверный пароль"); return false; }
    const data = await r.json();
    const parsed = typeof data === "string" ? JSON.parse(data) : data;
    setBanners(parsed.banners || []);
    return true;
  };

  const login = async () => {
    setError("");
    const ok = await load(password);
    if (ok) setAuthed(true);
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const method = editing.id ? "PUT" : "POST";
    await fetch(func2url.banners, { method, headers: { ...headers, "X-Admin-Mode": "true" }, body: JSON.stringify(editing) });
    await load(password);
    setEditing(null);
    setSaving(false);
  };

  const remove = async (id: number) => {
    if (!confirm("Удалить баннер?")) return;
    await fetch(func2url.banners, { method: "DELETE", headers: { ...headers, "X-Admin-Mode": "true" }, body: JSON.stringify({ id }) });
    await load(password);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-sm border border-white/10 rounded-2xl p-8">
          <h1 className="font-sentient text-2xl mb-2">Админка</h1>
          <p className="font-mono text-xs text-foreground/40 mb-6">Введите пароль для входа</p>
          {error && <p className="font-mono text-xs text-red-400 mb-4">{error}</p>}
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="mb-4 bg-white/5 border-white/20"
          />
          <Button onClick={login} className="w-full">[Войти]</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-sentient text-3xl">Управление баннерами</h1>
            <p className="font-mono text-xs text-foreground/40 mt-1">Реферальные ссылки на МФО</p>
          </div>
          <Button onClick={() => setEditing({ ...empty })}>[+ Добавить]</Button>
        </div>

        {editing && (
          <div className="border border-primary/40 rounded-2xl p-6 mb-10 bg-white/5">
            <h2 className="font-sentient text-xl mb-6">{editing.id ? "Редактировать" : "Новый баннер"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: "title", label: "Название МФО *" },
                { key: "ref_url", label: "Реферальная ссылка *" },
                { key: "description", label: "Описание" },
                { key: "logo_url", label: "URL логотипа" },
                { key: "rate", label: "Ставка (напр. от 0.5% в день)" },
                { key: "amount", label: "Сумма (напр. до 30 000 ₽)" },
                { key: "term", label: "Срок (напр. до 30 дней)" },
                { key: "sort_order", label: "Порядок сортировки" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="font-mono text-xs text-foreground/50 mb-1 block uppercase tracking-wide">{label}</label>
                  <Input
                    value={String((editing as Record<string, unknown>)[key] ?? "")}
                    onChange={(e) => setEditing({ ...editing, [key]: key === "sort_order" ? Number(e.target.value) : e.target.value })}
                    className="bg-white/5 border-white/20"
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4">
              <label className="flex items-center gap-2 font-mono text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={editing.is_active}
                  onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
                  className="accent-primary"
                />
                Активен
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={save} disabled={saving}>{saving ? "[Сохранение...]" : "[Сохранить]"}</Button>
              <Button variant="outline" onClick={() => setEditing(null)}>[Отмена]</Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {banners.map((b) => (
            <div key={b.id} className="flex items-center justify-between border border-white/10 rounded-xl px-5 py-4 hover:border-white/20 transition-colors">
              <div className="flex items-center gap-4">
                <span className={`w-2 h-2 rounded-full ${b.is_active ? "bg-primary" : "bg-white/20"}`} />
                <div>
                  <div className="font-sentient text-base">{b.title}</div>
                  <div className="font-mono text-xs text-foreground/40 mt-0.5">{b.ref_url}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-foreground/30">#{b.sort_order}</span>
                <Button size="sm" variant="outline" onClick={() => setEditing({ ...b })}>[Изменить]</Button>
                <Button size="sm" variant="destructive" onClick={() => remove(b.id!)}>[Удалить]</Button>
              </div>
            </div>
          ))}
          {banners.length === 0 && (
            <p className="text-center font-mono text-sm text-foreground/30 py-10">Баннеры не добавлены</p>
          )}
        </div>
      </div>
    </div>
  );
}