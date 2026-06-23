# -*- coding: utf-8 -*-
import os, shutil, sys
sys.stdout.reconfigure(encoding="utf-8")
ROOT = r"D:\jordan-ws\demo-sites"
REF  = os.path.join(ROOT, "dr-mouayyad-albtoush")           # source of css/js/images
TPL  = r"D:\jordan-ws\demo-sites\_variants"
GEN_IMAGES = ["gen-hero.jpg","gen-man.jpg","gen-hijab.jpg","gen-clinic.jpg","ba-before.jpg"]

tpl_index   = open(os.path.join(TPL,"template_index.html"),  encoding="utf-8").read()
tpl_contact = open(os.path.join(TPL,"template_contact.html"),encoding="utf-8").read()

WA_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zM6.597 20.13c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.477-.907z"/></svg>'
IG_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>'
FB_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z"/></svg>'

def socials_html(wa, ig, fb):
    h = ""
    if ig: h += f'<a href="{ig}" target="_blank" rel="noopener" aria-label="إنستغرام">{IG_SVG}</a>'
    if fb: h += f'<a href="{fb}" target="_blank" rel="noopener" aria-label="فيسبوك">{FB_SVG}</a>'
    h += f'<a href="https://wa.me/{wa}" target="_blank" rel="noopener" aria-label="واتساب">{WA_SVG}</a>'
    return h

# name_ar, brand_en, area, wa, ig, fb, (s1n,s1l,s2n,s2l,s3n,s3l)
DATA = {
 "dental-forte-7thcircle": ("عيادة دنتال فورتيه","DENTAL FORTE CLINIC","الدوار السابع","962793417070","","",
    ("أحدث","التقنيات","آلاف","حالة ناجحة","100%","تعقيم وأمان")),
 "dentist-smile-khalda": ("دنتست سمايل","DENTIST SMILE","خلدا","962798361224","","https://www.facebook.com/Dr.MahmoudDentalClinics",
    ("5.0★","تقييم جوجل","139+","مراجعة","100%","تعقيم وأمان")),
 "dr-mohammad-sallam": ("عيادة د. محمد سلّام","DR MOHAMMAD SALLAM","مرج الحمام","962799532868","","",
    ("4.7★","تقييم جوجل","95+","مراجعة","100%","تعقيم وأمان")),
 "dr-farah-clinics": ("عيادات الدكتورة فرح","DR FARAH CLINICS","خلدا","962790011513","","",
    ("5.0★","تقييم جوجل","28+","مراجعة","100%","تعقيم وأمان")),
 "dr-jamal-alkhalil": ("عيادة د. جمال الخليل","DR JAMAL ALKHALIL","جبل عمّان","962790057474","","",
    ("5.0★","تقييم جوجل","28+","مراجعة","100%","تعقيم وأمان")),
 "dr-munjed-salameh": ("د. منجد سلامة","DR MUNJED SALAMEH","تلاع العلي","962796654632","https://www.instagram.com/drmunjedasalameh","",
    ("4.9★","تقييم جوجل","88+","مراجعة","100%","تعقيم وأمان")),
 "dr-ahmad-sammar": ("د. أحمد سمار","DR AHMAD SAMMAR","الشميساني","962795784872","","",
    ("4.8★","تقييم جوجل","63+","مراجعة","100%","تعقيم وأمان")),
 "dr-marwan-rajab": ("مركز د. مروان رجب","DR MARWAN RAJAB","جبل عمّان","962770785264","","",
    ("5.0★","تقييم جوجل","113+","مراجعة","100%","تعقيم وأمان")),
 "dr-basel-amro": ("عيادة الدكتور باسل عمرو","DR BASEL AMRO","الشميساني","962799583804","","",
    ("4.9★","تقييم جوجل","82+","مراجعة","100%","تعقيم وأمان")),
 "dr-yusra-sharif": ("د. يسرى الشريف","GERMAN DENTAL CONCEPTS","جبل عمّان","962797027633","","",
    ("5.0★","تقييم جوجل","62+","مراجعة","100%","تعقيم وأمان")),
 "dr-eid-awwad": ("عيادة الدكتور عيد عوّاد","DR EID AWWAD","عبدون","962796004007","","",
    ("أحدث","التقنيات","آلاف","حالة ناجحة","100%","تعقيم وأمان")),
 "dr-ashraf-qussous": ("د. أشرف القسوس","DR ASHRAF QUSSOUS","الجاردنز","962799814402","","",
    ("4.9★","تقييم جوجل","195+","مراجعة","100%","تعقيم وأمان")),
}

def fill(t, repl):
    for k,v in repl.items():
        t = t.replace("⟦"+k+"⟧", v)
    return t

done=0
for slug,(name,brand,area,wa,ig,fb,stats) in DATA.items():
    d = os.path.join(ROOT, slug)
    if not os.path.isdir(d):
        print("MISSING", slug); continue
    digits = wa[3:]                                   # 9 digits after 962
    phone_local = "0"+digits[0:3]+" "+digits[3:6]+" "+digits[6:]   # 079X XXX XXX
    phone_intl  = "+962 "+digits[0:2]+" "+digits[2:5]+" "+digits[5:]
    if ig:
        follow_href, follow_txt = ig, "@"+ig.rstrip("/").split("/")[-1]
    elif fb:
        follow_href, follow_txt = fb, "صفحتنا على فيسبوك"
    else:
        follow_href, follow_txt = f"https://wa.me/{wa}", "تواصل عبر واتساب"
    repl = {
      "NAME_AR":name, "BRAND_EN":brand, "AREA_AR":area, "WA":wa,
      "PHONE":phone_local, "PHONE_INTL":phone_intl,
      "TAG": f"{brand} · {area}، عمّان",
      "TITLE": f"{name} — تصميم الابتسامة وزراعة الأسنان في {area}، عمّان",
      "DESC": f"{name} في {area}، عمّان — تصميم الابتسامة الرقمي، ابتسامة هوليوود، الفينير، التبييض وزراعة الأسنان. احجز عبر واتساب {phone_local}.",
      "HERO_SUB": f"نقدّم في {name} تصميم الابتسامة الرقمي، الفينير وزراعة الأسنان في {area}، عمّان — حيث يلتقي العلم بالفن لتُولد ابتسامة تليق بك. اكتشف الفرق بنفسك.",
      "S1N":stats[0],"S1L":stats[1],"S2N":stats[2],"S2L":stats[3],"S3N":stats[4],"S3L":stats[5],
      "BIO1": f"{name} في {area}، عمّان — وجهتك لرعاية أسنان متكاملة تجمع بين الخبرة الطبية وأحدث التقنيات، مع اهتمام بأدق التفاصيل.",
      "BIO2": "نحرص على راحتك من أول استشارة حتى آخر جلسة، ونصمّم لك خطة علاج واضحة لنمنحك ابتسامة صحية وجميلة تدوم.",
      "SOCIALS": socials_html(wa,ig,fb),
      "FOLLOW_HREF":follow_href, "FOLLOW_TXT":follow_txt,
    }
    open(os.path.join(d,"index.html"),"w",encoding="utf-8").write(fill(tpl_index,repl))
    open(os.path.join(d,"contact.html"),"w",encoding="utf-8").write(fill(tpl_contact,repl))
    shutil.copy(os.path.join(REF,"style.css"),  os.path.join(d,"style.css"))
    shutil.copy(os.path.join(REF,"script.js"),  os.path.join(d,"script.js"))
    for img in GEN_IMAGES:
        shutil.copy(os.path.join(REF,"assets",img), os.path.join(d,"assets",img))
    done+=1; print("BUILT", slug)
print(f"\nDONE {done}/{len(DATA)}")
