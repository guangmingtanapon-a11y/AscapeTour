import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Landmark, Bus, Hotel, Utensils, Shield, Calendar, MapPin, Phone, Mail, Calculator, ArrowRight } from "lucide-react";

// ---------- Content Data (Thai) ----------
const itinerary = [
  {
    day: "Day 1",
    blocks: [
      { time: "07:00 – 09:30", items: ["ออกเดินทางจากกรุงเทพฯ → อยุธยา"] },
      { time: "09:30 – 11:30", items: ["วัดไชยวัฒนาราม", "วัดมหาธาตุ"] },
      { time: "12:00 – 13:00", items: ["อาหารกลางวันริมน้ำ – ร้านบ้านวัชราชัย / ร้านริมน้ำอยุธยา"] },
      { time: "13:30 – 16:00", items: ["วัดพระศรีสรรเพชญ์", "วัดโลกยสุธาราม", "คาเฟ่ The Summer House Ayutthaya"] },
      { time: "17:00 – 19:00", items: ["เช็คอินที่พัก (Sala Ayutthaya / iuDia Hotel)", "ดินเนอร์ริมแม่น้ำ"] },
    ],
  },
  {
    day: "Day 2",
    blocks: [
      { time: "08:00 – 09:30", items: ["ตลาดน้ำอโยธยา"] },
      { time: "09:30 – 11:00", items: ["วัดพุทไธศวรรย์"] },
      { time: "12:00 – 13:00", items: ["อาหารกลางวันก๋วยเตี๋ยวเรือ / โรตีสายไหม", "คาเฟ่ Busaba Café & Bake Lab"] },
      { time: "13:30 – 16:30", items: ["วัดใหญ่ชัยมงคล", "คาเฟ่ Ayutthaya Retreat"] },
      { time: "16:30 – 18:00", items: ["เดินทางกลับกรุงเทพฯ"] },
    ],
  },
];

const packages = [
  {
    name: "Luxury Package",
    travel: "รถตู้ VIP + น้ำมัน + คนขับ",
    hotel: "Boutique Hotel ริมน้ำ (Sala / iuDia)",
    meals: "ร้านดังริมน้ำ 4 มื้อ (≈250/มื้อ)",
    cafes: "3 คาเฟ่: The Summer House / Busaba / Retreat",
    guide: "ไกด์เต็มทริป",
    insurance: "ประกันอุบัติเหตุรวม",
    access: "ค่าเข้าชม 4 วัด",
    costGroup: 32900, // 10 คน
    costPer: 3290,
    sellPer: 4200,
    profitGroup: 9100,
  },
  {
    name: "Budget Package",
    travel: "รถตู้มาตรฐาน + น้ำมัน",
    hotel: "โรงแรม 3 ดาว/โฮสเทลคุณภาพ",
    meals: "ร้านท้องถิ่น 4 มื้อ (≈150/มื้อ)",
    cafes: "2 คาเฟ่: The Summer House / Retreat",
    guide: "ไกด์ครึ่งวัน",
    insurance: "ประกันอุบัติเหตุรวม",
    access: "ค่าเข้าชม 4 วัด",
    costGroup: 21700, // 10 คน
    costPer: 2170,
    sellPer: 2700,
    profitGroup: 5400,
  },
];

function Badge({ icon: Icon, children }: { icon: any; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl bg-white/70 px-3 py-1 shadow-sm ring-1 ring-black/5">
      <Icon className="h-4 w-4" />
      <span className="text-sm">{children}</span>
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default function TourSite() {
  const [groupSize, setGroupSize] = useState<number>(10);
  const [margin, setMargin] = useState<number>(25); // %
  const [tier, setTier] = useState<"Luxury" | "Budget">("Budget");

  const selected = useMemo(() => packages.find(p => p.name.startsWith(tier))!, [tier]);
  const dynamicCostPer = useMemo(() => selected.costGroup / 10, [selected]);
  const sellPer = useMemo(() => Math.round(dynamicCostPer * (1 + margin / 100) / 10) * 10, [dynamicCostPer, margin]);
  const revenue = useMemo(() => sellPer * groupSize, [sellPer, groupSize]);
  const cost = useMemo(() => (selected.costGroup / 10) * groupSize, [selected, groupSize]);
  const profit = useMemo(() => revenue - cost, [revenue, cost]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-gray-900">
      {/* HERO */}
      <header className="relative">
        <div className="mx-auto max-w-6xl px-4 pt-10 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                กรุงเทพฯ – อยุธยา 2 วัน 1 คืน
              </h1>
              <p className="mt-3 text-lg text-gray-700">
                โปรแกรมทัวร์สไตล์ <span className="font-semibold">โบราณสถาน + คาเฟ่ชิค</span> กลิ่นอายประวัติศาสตร์คู่กับคาเฟ่บรรยากาศดี เดินทางสะดวก ปลอดภัย มีประกันครบ
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge icon={Calendar}>2 วัน 1 คืน</Badge>
                <Badge icon={MapPin}>กรุงเทพฯ ↔ อยุธยา</Badge>
                <Badge icon={Shield}>ประกันอุบัติเหตุรวม</Badge>
              </div>
            </div>
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-3xl bg-white/70 p-6 shadow-xl ring-1 ring-black/5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Bus className="h-6 w-6" />
                  <div>
                    <p className="text-sm text-gray-600">การเดินทาง</p>
                    <p className="font-semibold">รถตู้พร้อมคนขับ</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Hotel className="h-6 w-6" />
                  <div>
                    <p className="text-sm text-gray-600">ที่พัก</p>
                    <p className="font-semibold">โรงแรมคุณภาพ</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Utensils className="h-6 w-6" />
                  <div>
                    <p className="text-sm text-gray-600">อาหาร</p>
                    <p className="font-semibold">ร้านท้องถิ่น/ริมน้ำ</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Coffee className="h-6 w-6" />
                  <div>
                    <p className="text-sm text-gray-600">คาเฟ่ไฮไลท์</p>
                    <p className="font-semibold">The Summer House / Retreat</p>
                  </div>
                </div>
              </div>
              <a href="#pricing" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-black/90 px-4 py-2 text-white shadow hover:bg-black">
                ดูราคา & คำนวณทันที <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* ITINERARY */}
      <Section title="ตารางการเดินทาง (Itinerary)" subtitle="เวลาโดยประมาณ ปรับได้ตามสภาพจราจรและความเหมาะสม">
        <div className="grid gap-6 md:grid-cols-2">
          {itinerary.map((d, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
              className="rounded-3xl bg-white p-5 shadow-md ring-1 ring-black/5">
              <h3 className="mb-3 text-xl font-semibold">{d.day}</h3>
              <div className="space-y-3">
                {d.blocks.map((b, i) => (
                  <div key={i} className="grid grid-cols-12 gap-3">
                    <div className="col-span-4 md:col-span-3 font-medium">{b.time}</div>
                    <ul className="col-span-8 md:col-span-9 list-disc space-y-1 pl-5">
                      {b.items.map((it, k) => (
                        <li key={k}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* HIGHLIGHTS */}
      <Section title="ไฮไลท์ทริป" subtitle="โบราณสถานตัวท็อป + คาเฟ่บรรยากาศดี">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 shadow ring-1 ring-black/5">
            <div className="flex items-center gap-2 font-semibold"><Landmark className="h-5 w-5"/>โบราณสถาน</div>
            <p className="mt-2 text-sm text-gray-700">วัดไชยวัฒนาราม · วัดมหาธาตุ · วัดพระศรีสรรเพชญ์ · วัดใหญ่ชัยมงคล · วัดโลกยสุธาราม · วัดพุทไธศวรรย์</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow ring-1 ring-black/5">
            <div className="flex items-center gap-2 font-semibold"><Coffee className="h-5 w-5"/>คาเฟ่ชิค</div>
            <p className="mt-2 text-sm text-gray-700">The Summer House Ayutthaya · Busaba Café & Bake Lab · Ayutthaya Retreat</p>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow ring-1 ring-black/5">
            <div className="flex items-center gap-2 font-semibold"><Shield className="h-5 w-5"/>ความปลอดภัย</div>
            <p className="mt-2 text-sm text-gray-700">ประกันอุบัติเหตุการเดินทาง · บริษัทนำเที่ยวถูกกฎหมาย · เอกสารค่าใช้จ่ายโปร่งใส</p>
          </div>
        </div>
      </Section>

      {/* PACKAGES COMPARE */}
      <Section title="แพ็กเกจที่มีให้เลือก" subtitle="เลือกตามสไตล์และงบประมาณของคุณ">
        <div className="overflow-x-auto rounded-2xl bg-white p-4 shadow ring-1 ring-black/5">
          <table className="w-full text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">รายการ</th>
                {packages.map((p) => (
                  <th key={p.name} className="p-3">{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { k: "การเดินทาง", v: [packages[0].travel, packages[1].travel] },
                { k: "ที่พัก", v: [packages[0].hotel, packages[1].hotel] },
                { k: "อาหาร", v: [packages[0].meals, packages[1].meals] },
                { k: "คาเฟ่", v: [packages[0].cafes, packages[1].cafes] },
                { k: "ไกด์", v: [packages[0].guide, packages[1].guide] },
                { k: "ประกัน", v: [packages[0].insurance, packages[1].insurance] },
                { k: "ค่าเข้าชม", v: [packages[0].access, packages[1].access] },
                { k: "ต้นทุนรวม (10 คน)", v: [
                  `${packages[0].costGroup.toLocaleString()} บาท`,
                  `${packages[1].costGroup.toLocaleString()} บาท`,
                ] },
                { k: "ต้นทุนต่อคน", v: [
                  `${packages[0].costPer.toLocaleString()} บาท`,
                  `${packages[1].costPer.toLocaleString()} บาท`,
                ] },
                { k: "ราคาขาย (โดยประมาณ)", v: [
                  `~${packages[0].sellPer.toLocaleString()} บาท/คน`,
                  `~${packages[1].sellPer.toLocaleString()} บาท/คน`,
                ] },
                { k: "กำไรสุทธิ (10 คน)", v: [
                  `~${packages[0].profitGroup.toLocaleString()} บาท`,
                  `~${packages[1].profitGroup.toLocaleString()} บาท`,
                ] },
              ].map((row, idx) => (
                <tr key={row.k} className={idx % 2 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-3 font-medium">{row.k}</td>
                  {row.v.map((val, i) => (
                    <td key={i} className="p-3">{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* PRICING CALCULATOR */}
      <Section title="คำนวณราคาแพ็กเกจ" subtitle="เลือกแพ็กเกจ ขนาดกรุ๊ป และกำไร (ตามกฎหมายควรโปร่งใสและเหมาะสม ~20–30%)">
        <div id="pricing" className="grid gap-4 rounded-3xl bg-white p-6 shadow ring-1 ring-black/5">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">เลือกแพ็กเกจ</label>
              <select value={tier} onChange={(e) => setTier(e.target.value as any)} className="rounded-xl border px-3 py-2">
                <option value="Budget">Budget Package</option>
                <option value="Luxury">Luxury Package</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">จำนวนผู้เดินทาง (คน)</label>
              <input type="number" min={4} max={30} value={groupSize} onChange={(e) => setGroupSize(parseInt(e.target.value || "0"))} className="rounded-xl border px-3 py-2" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">กำไรที่ต้องการ (%)</label>
              <input type="number" min={10} max={40} value={margin} onChange={(e) => setMargin(parseInt(e.target.value || "0"))} className="rounded-xl border px-3 py-2" />
            </div>
            <div className="flex items-end">
              <div className="flex items-center gap-2 rounded-2xl bg-gray-900 px-4 py-2 text-white shadow">
                <Calculator className="h-4 w-4"/>
                <span>คำนวณอัตโนมัติ</span>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-sm text-gray-600">ต้นทุนต่อคน (อิง 10 คน)</p>
              <p className="text-2xl font-bold">{dynamicCostPer.toLocaleString()} บาท</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-sm text-gray-600">ราคาขายต่อคน (กำไร {margin}%)</p>
              <p className="text-2xl font-bold">{sellPer.toLocaleString()} บาท</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-sm text-gray-600">กำไรทั้งกรุ๊ป</p>
              <p className={`text-2xl font-bold ${profit >= 0 ? "text-emerald-700" : "text-red-600"}`}>{profit.toLocaleString()} บาท</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">* ตัวเลขต้นทุนเป็นประมาณการจากราคาตลาดปัจจุบัน ควรอัปเดตราคาโรงแรม/รถ/ไกด์/ร้านอาหารจริงก่อนเสนอขายทุกครั้ง</p>
        </div>
      </Section>

      {/* CONTACT */}
      <Section title="ติดต่อจองทัวร์/ขอใบเสนอราคา">
        <div className="grid gap-4 md:grid-cols-2">
          <form className="rounded-3xl bg-white p-6 shadow ring-1 ring-black/5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">ชื่อผู้ติดต่อ</label>
                <input className="rounded-xl border px-3 py-2" placeholder="เช่น ออย" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">อีเมล</label>
                <input className="rounded-xl border px-3 py-2" placeholder="name@email.com" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">เบอร์โทร</label>
                <input className="rounded-xl border px-3 py-2" placeholder="081-234-5678" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium">ขนาดกรุ๊ป (คน)</label>
                <input type="number" className="rounded-xl border px-3 py-2" placeholder="10" />
              </div>
              <div className="md:col-span-2 flex flex-col gap-1">
                <label className="text-sm font-medium">ข้อความ/ความต้องการเพิ่มเติม</label>
                <textarea className="h-28 rounded-xl border px-3 py-2" placeholder="ระบุช่วงวันที่ต้องการ เดินทางแบบงบประหยัดหรือพรีเมียม ฯลฯ"/>
              </div>
            </div>
            <button type="button" className="mt-4 w-full rounded-2xl bg-gray-900 px-4 py-3 font-medium text-white shadow hover:bg-black">ส่งคำขอใบเสนอราคา</button>
            <p className="mt-2 text-xs text-gray-500">* ปุ่มนี้เป็นตัวอย่าง UI — เชื่อมต่ออีเมล/ไลน์แชทได้ภายหลัง</p>
          </form>

          <div className="rounded-3xl bg-white p-6 shadow ring-1 ring-black/5">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">ข้อมูลการติดต่อ</h3>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4"/> <span>080-000-0000</span></div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4"/> <span>tour@example.com</span></div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> <span>กรุงเทพฯ – อยุธยา, Thailand</span></div>
              <div className="rounded-2xl bg-gray-50 p-4 text-sm">
                <p className="font-medium">เงื่อนไขสำคัญ:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>ราคาขายรวมประกันอุบัติเหตุการเดินทางตามกฎหมาย</li>
                  <li>ราคาไม่รวมค่าใช้จ่ายส่วนตัว เช่น เครื่องดื่มเพิ่ม ของฝาก</li>
                  <li>กำไรบริษัทโปร่งใสตามเกณฑ์แนะนำ ~20–30%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} Bangkok–Ayutthaya Tour • Designed for demo use
        </div>
      </footer>
    </div>
  );
}
