const { useState, useEffect, useRef } = React;

const Icons = {
    Sparkles: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
    AlertTriangle: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" x2="12" y1="9" y2="13"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>,
    Activity: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    User: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    Baby: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><path d="M8.5 15H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3.5"/><path d="M12 15v7"/><path d="M8.5 22h7"/></svg>,
    BookOpen: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    Search: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    Check: () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>,
    Moon: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
    Sun: () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
};

const MEDICAL_TERMS = {
    'лактостаз': 'Болезненный застой молока в протоках груди. Требует частых прикладываний.',
    'мастит': 'Воспаление ткани молочной железы, часто сопровождается температурой.',
    'инволюци': 'Естественный процесс сокращения матки до прежних размеров.',
    'лохии': 'Послеродовые выделения — нормальный процесс очищения матки.',
    'диастаз': 'Расхождение прямых мышц живота после беременности.',
    'пилоростеноз': 'Опасное сужение отдела желудка, вызывает срыгивание фонтаном.',
    'регресс сна': 'Временное ухудшение сна из-за скачков развития мозга малыша.',
    'колики': 'Приступы плача у здорового ребенка из-за незрелости ЖКТ.',
    'mastitis': 'Inflammation of breast tissue that sometimes involves an infection.',
    'engorgement': 'Breast swelling due to milk buildup.',
    'colic': 'Predictable periods of significant distress in an otherwise well, well-fed, healthy baby.'
};

const renderTextWithTooltips = (text) => {
    const termsKeys = Object.keys(MEDICAL_TERMS).join('|');
    const regex = new RegExp(`(${termsKeys}[а-яa-z]*)(?=[\\s.,!?]|$)`, 'gi');
    
    return text.split(regex).map((part, i) => {
        const lowerPart = part.toLowerCase();
        const matchedKey = Object.keys(MEDICAL_TERMS).find(k => lowerPart.startsWith(k));
        
        if (matchedKey) {
            return (
                <span key={i} className="relative group inline-block cursor-help">
                    <span className="border-b border-dashed border-nurture-primary text-nurture-primary dark:text-[#D4A373] dark:border-[#D4A373]">{part}</span>
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-nurture-text dark:bg-white text-white dark:text-nurture-bg text-[11px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 text-center shadow-premium font-medium">
                        {MEDICAL_TERMS[matchedKey]}
                        <svg className="absolute text-nurture-text dark:text-white h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon fill="currentColor" points="0,0 127.5,127.5 255,0"/></svg>
                    </span>
                </span>
            );
        }
        return part;
    });
};

const DICT = {
    ru: {
        onboarding: {
            title: "AguMi",
            subtitle: "Ваш премиальный ИИ-коуч. Настройте профиль для персонализации.",
            name: "Имя малыша", namePh: "Например, Лео",
            feed: "Питание", feedTypes: ['ГВ', 'ИВ', 'Смешанное'],
            birth: "Роды", birthTypes: { 'ЕР': 'Естественные', 'КС': 'Кесарево' },
            startBtn: "Войти в систему"
        },
        dash: {
            babyTab: "Малыш", momTab: "Здоровье", libraryTab: "Справочник", auditTab: "Клин. база",
            logs: "Журнал рутины",
            quickLogs: [
                { icon: '🍼', label: 'Поел' }, { icon: '💩', label: 'Стул' }, { icon: '💤', label: 'Сон' },
                { icon: '💧', label: 'Сцеживание' }, { icon: '🛁', label: 'Купание' }, { icon: '💊', label: 'Витамины' }
            ],
            logEmpty: "Журнал пуст. Нажмите на иконку выше, чтобы добавить событие.",
            analyzerTitle: "Симптом-чекер", analyzerDesc: "ИИ анализирует состояние в реальном времени. Опишите симптомы:",
            tagsBaby: ["Срыгивает фонтаном", "Зеленый стул", "Плачет и жмет ножки", "Выгибается дугой", "Плохо спит"],
            tagsMom: ["Уплотнение в груди", "Болит шов", "Усталость / Апатия", "Температура 38+"],
            placeholderBaby: "Например: плачет, выгибается дугой, есть температура...",
            placeholderMom: "Опишите ваше самочувствие...",
            askBtn: "Проанализировать", clarifyBtn: "Уточнить симптомы",
            redFlagsTitle: "SOS-маркеры (Мама)", redFlagsDesc: "Немедленно свяжитесь с врачом при наличии:",
            redFlagsList: ["Температура выше 38.0°C", "Обильное кровотечение", "Горячее уплотнение в груди", "Апатия и плохие мысли"],
            library: {
                title: "Медицинская библиотека", desc: "Поиск по базам PubMed и педиатрическим справочникам.",
                placeholder: "Например: писает с кровью...", searchBtn: "Искать", searching: "Поиск по базам...", source: "Источник:"
            },
            auditHeroTitle: "Архитектура MVP в FemTech", auditHeroDesc: "Комплексный анализ проблем четвертого триместра.",
            auditSec1Title: "1. Соматический ландшафт", auditSec2Title: "2. Лактационный лабиринт", auditSec3Title: "3. Психоэмоциональный тигель"
        }
    },
    en: {
        onboarding: {
            title: "AguMi",
            subtitle: "Your premium AI coach. Configure your profile for personalization.",
            name: "Baby's Name", namePh: "e.g., Leo",
            feed: "Feeding", feedTypes: ['Breast', 'Formula', 'Mixed'],
            birth: "Delivery", birthTypes: { 'ЕР': 'Vaginal', 'КС': 'C-Section' },
            startBtn: "Enter Dashboard"
        },
        dash: {
            babyTab: "Baby", momTab: "Mom's Health", libraryTab: "Library", auditTab: "Whitepaper",
            logs: "Routine Log",
            quickLogs: [
                { icon: '🍼', label: 'Fed' }, { icon: '💩', label: 'Diaper' }, { icon: '💤', label: 'Sleep' },
                { icon: '💧', label: 'Pumped' }, { icon: '🛁', label: 'Bath' }, { icon: '💊', label: 'Vitamins' }
            ],
            logEmpty: "Log is empty. Click an icon above to add an event.",
            analyzerTitle: "Symptom Checker", analyzerDesc: "AI analyzes status in real-time. Describe symptoms:",
            tagsBaby: ["Projectile spit-up", "Green stool", "Pulling legs", "Arching back", "Poor sleep"],
            tagsMom: ["Breast lump", "Incision pain", "Exhaustion / Apathy", "Fever 38+"],
            placeholderBaby: "e.g.: crying, arching back, has fever...",
            placeholderMom: "Describe how you feel...",
            askBtn: "Analyze", clarifyBtn: "Clarify Symptoms",
            redFlagsTitle: "SOS Markers (Mom)", redFlagsDesc: "Contact healthcare provider immediately if:",
            redFlagsList: ["Fever over 38.0°C", "Heavy bleeding", "Hot, red breast lump", "Intrusive thoughts"],
            library: {
                title: "Medical Library", desc: "Search across PubMed and pediatric databases.",
                placeholder: "e.g.: blood in urine...", searchBtn: "Search", searching: "Searching databases...", source: "Source:"
            },
            auditHeroTitle: "FemTech MVP Architecture", auditHeroDesc: "Analysis of fourth-trimester challenges.",
            auditSec1Title: "1. Somatic Landscape", auditSec2Title: "2. The Lactation Labyrinth", auditSec3Title: "3. Psycho-emotional Crucible"
        }
    }
};

// --- ИНТЕЛЛЕКТУАЛЬНЫЙ ДВИЖОК ИИ ---
const getAIResponse = (query, tab, lang, baby) => {
    let response = { type: 'normal', text: '' };
    
    if (tab === 'baby') {
        // Red Flags Override
        if (query.includes('температур') || query.includes('fever') || query.includes('38') || query.includes('hot')) {
            response.type = 'alert';
            response.text = lang === 'ru' 
                ? '⚠️ Температура у новорожденного — это КРАСНЫЙ ФЛАГ. Срочно вызовите педиатра или скорую. Не занимайтесь самолечением!'
                : '⚠️ A fever in a newborn is a RED FLAG. Call a pediatrician or emergency services immediately. Do not self-medicate!';
        } 
        else if (query.includes('кров') || query.includes('blood')) {
            response.type = 'alert';
            response.text = lang === 'ru' ? '⚠️ Кровь в стуле или рвоте требует немедленного осмотра врачом. Вызовите скорую помощь.' : '⚠️ Blood in stool or vomit requires immediate medical evaluation. Call emergency services.';
        }
        else if (query.includes('срыгив') || query.includes('фонтан') || query.includes('spit')) {
            if(query.includes('фонтан') || query.includes('projectile')) {
                response.type = 'alert';
                response.text = lang === 'ru' ? '⚠️ Срыгивание "фонтаном" после каждого кормления может быть признаком пилоростеноза. СРОЧНО свяжитесь с педиатром.' : '⚠️ Projectile spit-up after every feed could indicate pyloric stenosis. Call a pediatrician IMMEDIATELY.';
            } else {
                response.type = 'normal';
                response.text = lang === 'ru' ? `Обычные срыгивания (1-2 ложки) — это норма.\n\n💡 Совет:\nНосите ${baby.name} "столбиком" 10-15 минут после еды.` : `Normal spit-ups (1-2 tbsp) are fine.\n\n💡 Tip:\nHold ${baby.name} upright for 10-15 mins after feeding.`;
            }
        } 
        else if (query.includes('ножк') || query.includes('дугой') || query.includes('плач') || query.includes('legs') || query.includes('arch')) {
            response.type = 'warning';
            response.text = lang === 'ru'
                ? `Если ${baby.name} плачет, поджимает ножки или выгибается дугой, это похоже на колики или скопление газиков.\n\n💡 Что делать:\n1. Сделайте массаж животика по часовой стрелке.\n2. Упражнение "велосипед" ножками.\n3. Положите теплую пеленочку на живот.`
                : `If ${baby.name} is crying, pulling legs up, or arching, it sounds like colic or gas.\n\n💡 What to do:\n1. Gently massage the tummy clockwise.\n2. Do "bicycle" legs.\n3. Place a warm cloth on the tummy.`;
        } 
        else if (query.includes('стул') || query.includes('кака') || query.includes('stool')) {
            if(query.includes('зелен') || query.includes('пен') || query.includes('green')) {
                response.type = 'warning';
                response.text = lang === 'ru' ? `Так как у вас ${baby.feeding}, зеленый стул с пеной может означать дисбаланс переднего и заднего молока. Попробуйте реже менять грудь.` : `Since you use ${baby.feeding}, frothy green stool might mean a foremilk/hindmilk imbalance. Try finishing one breast completely.`;
            } else {
                response.type = 'normal';
                response.text = lang === 'ru' ? `Норма стула при ${baby.feeding}:\nСледите, чтобы стул был мягким и не было запоров.` : `Stool norm for ${baby.feeding}:\nWatch out for hard stool which indicates constipation.`;
            }
        }
        else {
            response.type = 'normal';
            response.text = lang === 'ru'
                ? "Я анализирую паттерны... Пожалуйста, уточните: есть ли температура, как малыш спит, как часто это происходит?"
                : "I am analyzing... Please clarify: is there a fever, how is the baby sleeping, how often does this happen?";
        }
    } else {
        // Mom Tab
        if (query.includes('температур') || query.includes('fever')) {
            response.type = 'alert';
            response.text = lang === 'ru' ? `⚠️ Температура у мамы после родов — тревожный знак. Это может быть инфекция шва или мастит. Срочно обратитесь к врачу.` : `⚠️ Postpartum fever is a red flag. It could indicate an infection or mastitis. See a doctor immediately.`;
        }
        else if (query.includes('грудь') || query.includes('комок') || query.includes('lump')) {
            response.type = 'alert';
            response.text = lang === 'ru' ? `⚠️ Плотный комок в груди, боль и покраснение — это лактостаз.\n\n🔴 ЧТО ДЕЛАТЬ:\n1. Чаще прикладывайте ребенка.\n2. Теплый душ ПЕРЕД кормлением.\n3. Прохладный компресс ПОСЛЕ.\n4. НЕ разминайте грудь через боль!` : `⚠️ A hard breast lump indicates engorgement or mastitis.\n\n🔴 DO THIS NOW:\n1. Nurse frequently.\n2. Warm shower BEFORE feeding.\n3. Cold compress AFTER feeding.`;
        }
        else if (query.includes('шов') || query.includes('болит') || query.includes('pain')) {
            response.type = 'warning';
            response.text = lang === 'ru' ? `У вас были роды: ${baby.birthType}.\nТянущая боль нормальна. ⚠️ Обратитесь к врачу, если: шов стал горячим, покраснел, выделения плохо пахнут.` : `You had a ${baby.birthType} delivery. Soreness is normal. ⚠️ See a doctor if: incision feels hot, turns red, or has foul discharge.`;
        }
        else if (query.includes('устал') || query.includes('апати') || query.includes('tired') || query.includes('apathy')) {
            response.type = 'warning';
            response.text = lang === 'ru' ? `Стремительное падение гормонов вызывает «бэби-блюз». Это нормально чувствовать усталость. Но если апатия длится более 2 недель или есть пугающие мысли — обязательно скажите об этом близким или врачу.` : `Hormonal drops cause "baby blues". It's normal to feel tired. But if apathy lasts >2 weeks or you have scary thoughts, please speak to a doctor.`;
        }
        else {
            response.type = 'normal';
            response.text = lang === 'ru' ? "Расскажите подробнее: когда появилась проблема, мешает ли она спать или двигаться?" : "Tell me more: when did the problem start, does it prevent you from sleeping?";
        }
    }
    return response;
};

// --- КОМПОНЕНТЫ ---
const Onboarding = ({ baby, setBaby, setStep, lang, setLang, t }) => (
    <div className="flex-1 flex flex-col items-center justify-center p-6 animate-fade-in relative z-10 overflow-y-auto">
        <div className="w-full max-w-md bg-nurture-card rounded-[2.5rem] p-8 md:p-10 shadow-premium border border-nurture-border relative">
            <div className="text-center mb-10">
                <h1 className="text-5xl font-extrabold tracking-tighter mb-4 text-nurture-primary dark:text-[#D4A373]">{t.onboarding.title}</h1>
                <p className="text-nurture-muted text-sm leading-relaxed font-medium">{t.onboarding.subtitle}</p>
            </div>
            <div className="space-y-6">
                <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-widest text-nurture-muted mb-3 ml-2">{t.onboarding.name}</label>
                    <input type="text" value={baby.name} onChange={e => setBaby({...baby, name: e.target.value})} className="w-full bg-nurture-bg border-2 border-nurture-border/50 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:border-nurture-primary transition-all shadow-inner-soft font-bold text-nurture-text placeholder:font-medium placeholder:text-nurture-muted/50" placeholder={t.onboarding.namePh} />
                </div>
                <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-widest text-nurture-muted mb-3 ml-2">{t.onboarding.feed}</label>
                    <div className="grid grid-cols-3 gap-2">
                        {t.onboarding.feedTypes.map((type, i) => (
                            <button key={type} onClick={() => setBaby({...baby, feeding: ['ГВ', 'ИВ', 'Смешанное'][i]})} className={`py-4 rounded-2xl text-sm font-extrabold border-2 transition-all active:scale-95 ${baby.feeding === ['ГВ', 'ИВ', 'Смешанное'][i] ? 'bg-nurture-primary dark:bg-[#D4A373] text-white dark:text-[#161413] border-nurture-primary dark:border-[#D4A373]' : 'bg-nurture-bg border-nurture-border/50 text-nurture-muted'}`}>{type}</button>
                        ))}
                    </div>
                </div>
                <div>
                    <label className="block text-[11px] font-extrabold uppercase tracking-widest text-nurture-muted mb-3 ml-2">{t.onboarding.birth}</label>
                    <div className="grid grid-cols-2 gap-2">
                        {Object.entries(t.onboarding.birthTypes).map(([key, label]) => (
                            <button key={key} onClick={() => setBaby({...baby, birthType: key})} className={`py-4 rounded-2xl text-sm font-extrabold border-2 transition-all active:scale-95 ${baby.birthType === key ? 'bg-nurture-secondary text-white border-nurture-secondary' : 'bg-nurture-bg border-nurture-border/50 text-nurture-muted'}`}>{label}</button>
                        ))}
                    </div>
                </div>
                <button onClick={() => setStep(2)} disabled={!baby.name || !baby.feeding || !baby.birthType} className="w-full bg-nurture-text dark:bg-white text-nurture-bg dark:text-nurture-text py-5 rounded-2xl font-extrabold text-lg mt-8 hover:opacity-90 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-premium">
                    {t.onboarding.startBtn}
                </button>
            </div>
        </div>
    </div>
);

const AiAnalyzer = ({ aiInput, setAiInput, aiState, handleAiSubmit, aiResponse, setAiResponse, setAiState, tags, title, desc, placeholder, btnText, clarifyBtnText, themeClass, textClass }) => (
    <div className={`${themeClass} text-nurture-bg rounded-[2.5rem] p-6 md:p-8 shadow-premium relative overflow-hidden`}>
        <h2 className="font-extrabold text-xl mb-2 flex items-center gap-2"><span className={textClass}><Icons.Sparkles /></span> {title}</h2>
        <p className="text-nurture-bg/80 text-sm mb-6 font-medium">{desc}</p>

        <div className="flex flex-wrap gap-2 mb-6">
            {tags.map(tag => (
                <button key={tag} onClick={() => handleAiSubmit(tag)} disabled={aiState === 'typing'} className="text-[10px] md:text-[11px] uppercase font-bold border border-nurture-bg/30 px-4 py-2 rounded-full active:bg-nurture-bg/20 hover:bg-nurture-bg/10 transition-colors disabled:opacity-50">
                    {tag}
                </button>
            ))}
        </div>
        
        <textarea 
            value={aiInput}
            onChange={e => {
                setAiInput(e.target.value);
                if (aiState === 'done') setAiState('idle'); 
            }}
            disabled={aiState === 'typing'}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-base font-medium focus:outline-none focus:border-white/40 transition-all resize-none mb-5 placeholder:text-nurture-bg/40 text-white"
            rows="3" placeholder={placeholder}
        ></textarea>
        
        {aiState !== 'typing' && (
            <button onClick={() => handleAiSubmit()} disabled={!aiInput} className={`w-full bg-white ${textClass} font-extrabold py-4 rounded-2xl active:scale-95 transition-all disabled:opacity-50 text-base shadow-md hover:shadow-lg`}>
                {aiState === 'done' ? clarifyBtnText : btnText}
            </button>
        )}

        {aiState === 'typing' && (
            <div className="flex items-center justify-center py-4 text-white">
                <svg height="10" width="30" className="mx-1">
                    <circle className="typing-dot" cx="5" cy="5" r="4" />
                    <circle className="typing-dot" cx="15" cy="5" r="4" />
                    <circle className="typing-dot" cx="25" cy="5" r="4" />
                </svg>
            </div>
        )}

        {aiState === 'done' && aiResponse && (
            <div className={`mt-6 p-6 rounded-2xl border relative animate-fade-in ${aiResponse.type === 'alert' ? 'bg-[#FFF5F5] border-nurture-alert/30 text-nurture-text' : aiResponse.type === 'warning' ? 'bg-[#FFFDF5] border-[#E2CD99]/50 text-nurture-text' : 'bg-white/10 border-white/20 text-white'}`}>
                <button onClick={() => {setAiState('idle'); setAiInput(''); setAiResponse(null);}} className="absolute top-3 right-4 opacity-60 hover:opacity-100 font-bold text-xl">✕</button>
                <div className="text-sm leading-relaxed whitespace-pre-wrap font-bold pr-4">
                    {renderTextWithTooltips(aiResponse.text)}
                </div>
            </div>
        )}
    </div>
);

const RoutineJournal = ({ logs, quickLogs, addLog, emptyText }) => (
    <div className="bg-nurture-card rounded-[2.5rem] p-6 md:p-8 shadow-premium border border-nurture-border dark:bg-nurture-card">
        <h2 className="font-extrabold mb-5 text-xl text-nurture-text">Журнал рутины</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-6">
            {quickLogs.map((log, i) => (
                <button key={i} onClick={() => addLog(log)} className="flex flex-col items-center justify-center h-20 md:h-24 bg-nurture-bg dark:bg-[#1A1614] rounded-2xl border border-nurture-border hover:border-nurture-primary/50 transition-all active:scale-95">
                    <span className="text-2xl mb-1.5">{log.icon}</span>
                    <span className="text-[9px] md:text-[10px] font-extrabold uppercase text-nurture-text">{log.label}</span>
                </button>
            ))}
        </div>
        {logs.length > 0 ? (
            <div className="border-t border-nurture-border/50 pt-4 max-h-48 overflow-y-auto hide-scrollbar space-y-2">
                {logs.map((l) => (
                    <div key={l.id} className="flex items-center gap-4 p-3 bg-nurture-surface dark:bg-[#1E1B19] rounded-xl border border-nurture-border/30 animate-fade-in">
                        <div className="text-xl bg-white dark:bg-black/20 p-2 rounded-lg shadow-sm">{l.icon}</div>
                        <div className="flex-1">
                            <p className="text-sm font-extrabold text-nurture-text">{l.label}</p>
                            <p className="text-xs text-nurture-muted font-medium">Сегодня в {l.time}</p>
                        </div>
                        <div className="text-nurture-primary"><Icons.Check /></div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="border-t border-nurture-border/50 pt-6 text-center text-nurture-muted text-sm font-medium">{emptyText}</div>
        )}
    </div>
);

const LibraryView = ({ t, lang }) => {
    const [query, setQuery] = useState('');
    const [state, setState] = useState('idle');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        if (!query) return;
        setState('searching');
        setResults([]);
        setTimeout(() => {
            const q = query.toLowerCase();
            let res = [];
            if (q.includes('кров') || q.includes('моч') || q.includes('blood') || q.includes('pee')) {
                res.push({
                    type: 'alert',
                    title: lang==='ru' ? '🔴 Кровь в моче или подгузнике' : '🔴 Blood in urine/diaper',
                    desc: lang==='ru' ? 'Требует осмотра педиатра. Возможные причины:\n1. Инфекция мочевыводящих путей.\n2. Аллергия на белок коровьего молока.\n3. Ураты (соли в моче — норма для первых дней).' : 'Requires pediatric evaluation. Causes:\n1. UTI.\n2. Cow\'s milk allergy.\n3. Urate crystals (normal early on).',
                    source: 'Mayo Clinic, AAP'
                });
            } else if (q.includes('спит') || q.includes('сон') || q.includes('sleep')) {
                res.push({
                    type: 'normal',
                    title: lang==='ru' ? '💤 Регресс сна' : '💤 Sleep Regression',
                    desc: lang==='ru' ? 'Причины плохого сна:\n1. Регресс сна (4, 8, 12 месяцев).\n2. Скачок роста.\n3. Зубы.\nСовет: Обеспечьте темную комнату и белый шум.' : 'Causes for poor sleep:\n1. Regression (4, 8, 12 mo).\n2. Growth spurt.\n3. Teething.\nTip: Dark room & white noise.',
                    source: 'Sleep Foundation'
                });
            } else {
                res.push({
                    type: 'normal',
                    title: lang==='ru' ? '📚 Общая информация' : '📚 General Info',
                    desc: lang==='ru' ? 'Прямых красных флагов не найдено. Проконсультируйтесь с врачом.' : 'No red flags found. Consult your doctor.',
                    source: 'General Pediatric DB'
                });
            }
            setResults(res);
            setState('done');
        }, 800);
    };

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <div className="bg-nurture-text text-nurture-bg p-8 rounded-[2.5rem] shadow-premium dark:bg-[#1E1B19] dark:border dark:border-[#38322D]">
                <h2 className="font-extrabold text-2xl mb-3 flex items-center gap-3"><span className="text-nurture-primary dark:text-[#D4A373]"><Icons.Search /></span> {t.dash.library.title}</h2>
                <p className="text-sm text-nurture-bg/70 dark:text-nurture-muted mb-8 font-medium">{t.dash.library.desc}</p>
                <div className="flex bg-white/10 p-2 rounded-2xl border border-white/20 mb-4 focus-within:border-nurture-primary transition-colors">
                    <input type="text" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} className="flex-1 bg-transparent border-none text-white px-4 focus:outline-none placeholder:text-white/40 font-medium" placeholder={t.dash.library.placeholder} />
                    <button onClick={handleSearch} disabled={!query || state === 'searching'} className="bg-nurture-primary dark:bg-[#D4A373] text-nurture-text dark:text-[#161413] font-extrabold px-6 py-3 rounded-xl hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"><Icons.Search /></button>
                </div>
                {state === 'searching' && <div className="flex justify-center py-8"><span className="text-sm font-bold text-nurture-primary dark:text-[#D4A373] animate-pulse">{t.dash.library.searching}</span></div>}
                {state === 'done' && results.map((res, i) => (
                    <div key={i} className={`mt-6 p-6 rounded-2xl animate-fade-in ${res.type === 'alert' ? 'bg-[#FFF5F5] text-[#4A403A]' : 'bg-white/10 text-white'}`}>
                        <h3 className={`font-extrabold text-lg mb-3 ${res.type === 'alert' ? 'text-nurture-alert' : 'text-nurture-primary dark:text-[#D4A373]'}`}>{res.title}</h3>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium mb-4 opacity-90">{renderTextWithTooltips(res.desc)}</p>
                        <div className="text-[10px] font-extrabold uppercase tracking-widest opacity-50 border-t border-current pt-3">{t.dash.library.source} {res.source}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AuditView = ({ t, lang }) => (
    <div className="space-y-6 animate-fade-in pb-10">
        <div className="bg-nurture-card p-8 rounded-[2.5rem] border border-nurture-border shadow-premium">
            <h2 className="font-extrabold text-2xl mb-3 text-nurture-text">{t.dash.auditHeroTitle}</h2>
            <p className="text-base text-nurture-muted mb-8 leading-relaxed font-medium">{t.dash.auditHeroDesc}</p>
            <div className="space-y-10">
                <section>
                    <h3 className="font-bold text-lg text-nurture-primary border-b-2 border-nurture-border pb-3 mb-4">{t.dash.auditSec1Title}</h3>
                    <p className="text-sm text-nurture-text/80 leading-relaxed font-medium">
                        {lang === 'ru' ? 'Физическое восстановление после родов — это сложный процесс. Инволюция матки, травмы промежности и диастаз требуют бережного подхода. Наш MVP адаптирует советы в зависимости от типа родов (ЕР или КС).' : 'Physical recovery postpartum is complex. Uterine involution, perineal trauma, and diastasis recti require a gentle approach. Our MVP adapts advice based on delivery type (Vaginal or C-Section).'}
                    </p>
                </section>
                <section>
                    <h3 className="font-bold text-lg text-nurture-secondary border-b-2 border-nurture-border pb-3 mb-4">{t.dash.auditSec2Title}</h3>
                    <p className="text-sm text-nurture-text/80 leading-relaxed font-medium">
                        {lang === 'ru' ? 'Грудное вскармливание часто сопровождается болью. Лактостаз и мастит пугают молодых мам. ИИ-помощник объясняет правильное прикладывание простыми словами.' : 'Breastfeeding is often accompanied by pain. Engorgement and mastitis scare new moms. The AI coach explains proper latching in simple terms.'}
                    </p>
                </section>
                <section>
                    <h3 className="font-bold text-lg text-[#D19682] border-b-2 border-nurture-border pb-3 mb-4">{t.dash.auditSec3Title}</h3>
                    <p className="text-sm text-nurture-text/80 leading-relaxed mb-5 font-medium">
                        {lang === 'ru' ? 'Резкое падение гормонов вызывает «бэби-блюз» у 80% женщин, а у 15% перерастает в послеродовую депрессию. Мы мягко отслеживаем настроение.' : 'Hormonal drops trigger "baby blues" in 80% of women, leading to postpartum depression in 15%. The app gently tracks mood.'}
                    </p>
                    <div className="bg-nurture-surface p-5 rounded-2xl border border-nurture-border/50">
                        <p className="text-xs font-extrabold uppercase tracking-widest text-nurture-text mb-2">{lang==='ru'?'Парадокс Трекинга':'Tracking Paradox'}</p>
                        <p className="text-sm font-medium text-nurture-muted">
                            {lang === 'ru' ? 'Многие приложения заставляют маму маниакально вписывать каждую минуту сна. Это вызывает невроз. Мы используем умные подсказки (Smart Nudges).' : 'Many apps force moms to maniacally track every minute of sleep, causing neurosis. We use Smart Nudges to offload cognitive burden.'}
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </div>
);

// --- ГЛАВНЫЙ APP ---
const App = () => {
    const [step, setStep] = useState(1);
    const [activeTab, setActiveTab] = useState('baby'); 
    const [baby, setBaby] = useState({ name: '', feeding: '', birthType: '' });
    
    const [aiInput, setAiInput] = useState('');
    const [aiState, setAiState] = useState('idle');
    const [aiResponse, setAiResponse] = useState(null);
    
    const [theme, setTheme] = useState('light');
    const [logs, setLogs] = useState([]);
    const [toast, setToast] = useState(null);
    const [lang, setLang] = useState('ru');

    const t = DICT[lang];

    useEffect(() => {
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
    }, [theme]);

    useEffect(() => {
        setAiInput(''); setAiResponse(null); setAiState('idle');
    }, [activeTab]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
    const showToast = (message) => { setToast(message); setTimeout(() => setToast(null), 3000); };

    const handleAddLog = (log) => {
        const timeStr = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        setLogs([{ id: Date.now(), time: timeStr, ...log }, ...logs]);
        showToast(`${t.dash.logAdded} ${log.label}`);
    };

    const handleAiSubmit = (forcedQuery = null) => {
        const query = (forcedQuery || aiInput);
        if(!query) return;
        
        setAiInput(query);
        setAiState('typing');
        setAiResponse(null);
        
        setTimeout(() => {
            const response = getAIResponse(query.toLowerCase(), activeTab, lang, baby);
            setAiResponse(response);
            setAiState('done');
        }, 600); 
    };

    return (
        <div className="h-full w-full flex flex-col md:flex-row relative z-10">
            {toast && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-nurture-text dark:bg-white text-white dark:text-nurture-text px-6 py-3 rounded-full shadow-premium z-[100] animate-fade-in text-sm font-extrabold flex items-center gap-2">
                    <span className="text-nurture-primary"><Icons.Check /></span> {toast}
                </div>
            )}

            {step === 1 ? (
                <Onboarding baby={baby} setBaby={setBaby} setStep={setStep} lang={lang} setLang={setLang} t={t} />
            ) : (
                <>
                    <aside className="w-full md:w-72 lg:w-80 bg-nurture-surface border-b md:border-b-0 md:border-r border-nurture-border flex flex-col shrink-0 z-20">
                        <div className="p-6 flex justify-between items-center">
                            <h1 className="text-2xl font-extrabold text-nurture-primary dark:text-[#D4A373]">AguMi</h1>
                            <div className="flex gap-2">
                                <button onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')} className="bg-white dark:bg-[#1A1614] px-3 py-1 rounded-full text-xs font-extrabold text-nurture-text shadow-sm border border-nurture-border">{lang === 'ru' ? 'EN' : 'RU'}</button>
                                <button onClick={toggleTheme} className="bg-white dark:bg-[#1A1614] p-2 rounded-full text-nurture-text shadow-sm border border-nurture-border">{theme === 'light' ? <Icons.Moon /> : <Icons.Sun />}</button>
                            </div>
                        </div>
                        
                        <div className="flex md:flex-col gap-2 px-4 pb-4 md:px-6 md:pb-6 overflow-x-auto hide-scrollbar">
                            <button onClick={() => setActiveTab('baby')} className={`flex-shrink-0 md:w-full py-4 px-5 rounded-2xl text-sm font-extrabold flex items-center gap-3 transition-all ${activeTab === 'baby' ? 'bg-white dark:bg-[#25221F] shadow-md text-nurture-primary dark:text-[#D4A373]' : 'text-nurture-muted hover:bg-white/50 dark:hover:bg-white/5'}`}><Icons.Baby /> {t.dash.babyTab}</button>
                            <button onClick={() => setActiveTab('mom')} className={`flex-shrink-0 md:w-full py-4 px-5 rounded-2xl text-sm font-extrabold flex items-center gap-3 transition-all ${activeTab === 'mom' ? 'bg-white dark:bg-[#25221F] shadow-md text-nurture-secondary' : 'text-nurture-muted hover:bg-white/50 dark:hover:bg-white/5'}`}><Icons.User /> {t.dash.momTab}</button>
                            <button onClick={() => setActiveTab('library')} className={`flex-shrink-0 md:w-full py-4 px-5 rounded-2xl text-sm font-extrabold flex items-center gap-3 transition-all ${activeTab === 'library' ? 'bg-white dark:bg-[#25221F] shadow-md text-[#D19682]' : 'text-nurture-muted hover:bg-white/50 dark:hover:bg-white/5'}`}><Icons.Search /> {t.dash.libraryTab}</button>
                            <button onClick={() => setActiveTab('audit')} className={`flex-shrink-0 md:w-full py-4 px-5 rounded-2xl text-sm font-extrabold flex items-center gap-3 transition-all ${activeTab === 'audit' ? 'bg-white dark:bg-[#25221F] shadow-md text-nurture-text' : 'text-nurture-muted hover:bg-white/50 dark:hover:bg-white/5'}`}><Icons.BookOpen /> {t.dash.auditTab}</button>
                        </div>
                    </aside>

                    <main className="flex-1 overflow-y-auto hide-scrollbar p-4 md:p-10 relative z-10">
                        <div className="max-w-3xl mx-auto pb-20 space-y-8">
                            {activeTab === 'audit' && <AuditView t={t} lang={lang} />}
                            {activeTab === 'library' && <LibraryView t={t} lang={lang} />}

                            {activeTab === 'baby' && (
                                <div className="space-y-8 animate-fade-in">
                                    <RoutineJournal logs={logs} addLog={handleAddLog} quickLogs={t.dash.quickLogs} emptyText={t.dash.logEmpty} />
                                    <AiAnalyzer 
                                        aiInput={aiInput} setAiInput={setAiInput} aiState={aiState} handleAiSubmit={handleAiSubmit} 
                                        aiResponse={aiResponse} setAiResponse={setAiResponse} setAiState={setAiState}
                                        tags={t.dash.tagsBaby} title={t.dash.analyzerTitle} desc={t.dash.analyzerDesc} 
                                        placeholder={t.dash.placeholderBaby} btnText={t.dash.askBtn} clarifyBtnText={t.dash.clarifyBtn}
                                        themeClass="bg-nurture-text dark:bg-[#25221F]" textClass="text-nurture-primary dark:text-[#D4A373]"
                                    />
                                </div>
                            )}

                            {activeTab === 'mom' && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="bg-nurture-alert/10 dark:bg-nurture-alert/5 border-2 border-nurture-alert/20 rounded-[2.5rem] p-8">
                                        <h2 className="font-extrabold text-nurture-alert flex items-center gap-2 mb-4 text-lg"><Icons.AlertTriangle /> {t.dash.redFlagsTitle}</h2>
                                        <p className="text-sm font-medium text-nurture-text/80 mb-4">{t.dash.redFlagsDesc}</p>
                                        <ul className="text-sm space-y-2.5 font-bold text-nurture-text/80 ml-5 list-disc marker:text-nurture-alert">
                                            {t.dash.redFlagsList.map((item, i) => <li key={i}>{item}</li>)}
                                        </ul>
                                    </div>
                                    <AiAnalyzer 
                                        aiInput={aiInput} setAiInput={setAiInput} aiState={aiState} handleAiSubmit={handleAiSubmit} 
                                        aiResponse={aiResponse} setAiResponse={setAiResponse} setAiState={setAiState}
                                        tags={t.dash.tagsMom} title={t.dash.analyzerTitle} desc={t.dash.analyzerDesc} 
                                        placeholder={t.dash.placeholderMom} btnText={t.dash.askBtn} clarifyBtnText={t.dash.clarifyBtn}
                                        themeClass="bg-nurture-secondary dark:bg-[#25221F]" textClass="text-nurture-text"
                                    />
                                </div>
                            )}
                        </div>
                    </main>
                </>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);