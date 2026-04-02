<?php
// AguMi - Premium SaaS Edition (Dark Mode + UX/UI Tooltips)
session_start();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>AguMi | AI Maternity Coach</title>
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script>
        tailwind.config = {
            darkMode: 'class', // Включаем поддержку премиальной темной темы
            theme: {
                extend: {
                    colors: {
                        nurture: {
                            bg: '#FDFBF7',        
                            surface: '#F5EFE6',
                            text: '#3A332E',      
                            muted: '#8C827A',     
                            primary: '#E2AB99',   
                            primaryHover: '#D19682',
                            secondary: '#A3B19B', 
                            alert: '#D97777',     
                            card: '#FFFFFF',
                            border: '#E8E1D7'
                        }
                    },
                    fontFamily: { sans: ['Nunito', 'sans-serif'] },
                    boxShadow: {
                        'premium': '0 20px 40px -15px rgba(58, 51, 46, 0.08)',
                        'premium-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
                        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)'
                    }
                }
            }
        }
    </script>
    <style>
        html, body { 
            height: 100%;
            overflow: hidden; /* Блокируем дерганый скролл, скроллится только контент */
            -webkit-tap-highlight-color: transparent;
        }
        body { background-color: #FDFBF7; color: #3A332E; transition: background-color 0.5s ease; }
        
        /* Стили для темной темы (Midnight Premium) */
        html.dark body { background-color: #161413; color: #EFEBE4; }
        html.dark .bg-nurture-bg { background-color: #161413 !important; }
        html.dark .bg-nurture-surface { background-color: #1E1B19 !important; }
        html.dark .bg-nurture-card { background-color: #25221F !important; }
        html.dark .border-nurture-border { border-color: #38322D !important; }
        html.dark .text-nurture-text { color: #EFEBE4 !important; }
        html.dark .text-nurture-muted { color: #9A8F87 !important; }

        .hide-scrollbar::-webkit-scrollbar { width: 0px; height: 0px; background: transparent; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Тонкие 3D-анимации на фоне (Wireframes) */
        @keyframes slowSpin1 { 0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); } 100% { transform: rotateX(360deg) rotateY(180deg) rotateZ(360deg); } }
        @keyframes slowSpin2 { 0% { transform: rotateX(0deg) rotateY(360deg) rotateZ(0deg); } 100% { transform: rotateX(180deg) rotateY(0deg) rotateZ(180deg); } }
        
        .wireframe-1 { animation: slowSpin1 40s linear infinite; }
        .wireframe-2 { animation: slowSpin2 50s linear infinite; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        
        .typing-dot { animation: typing 1s infinite ease-in-out; fill: currentColor; }
        .typing-dot:nth-child(1) { animation-delay: 0s; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typing { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
    </style>
</head>
<body class="antialiased">

    <div id="root" class="h-full w-full"></div>

    <script type="text/babel" src="app.jsx"></script>
</body>
</html>