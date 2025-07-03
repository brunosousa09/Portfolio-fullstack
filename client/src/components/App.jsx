import React, { useEffect, useState } from 'react';
import { Link, Element } from 'react-scroll';
import {
  Github, Linkedin, Send, ArrowUp, CircleCheck, CircleDashed, Rocket, Menu as MenuIcon, X as CloseIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const TopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const navLinks = [
    { to: 'home', label: 'Home' },
    { to: 'stack', label: 'Stack' },
    { to: 'sobre-mim', label: 'Sobre mim' },
    { to: 'roadmap', label: 'Roadmap' },
    { to: 'contato', label: 'Contato' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#0d0d0d]/80 backdrop-blur-md border-b border-[#1f1f1f] text-[#e0e0e0]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tight">Bruno Antonio</div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-2 focus:outline-none">
            {isOpen ? <CloseIcon size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
        <ul className="hidden md:flex gap-10 text-lg font-medium">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link activeClass="font-semibold text-[#00ffe0]" to={link.to} spy={true} smooth={true} offset={-80} duration={500} className="hover:text-[#00ffe0] transition-colors duration-300 cursor-pointer">{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div className="md:hidden bg-[#0d0d0d] border-t border-[#1f1f1f]" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
            <ul className="flex flex-col p-4 space-y-4 text-lg font-medium">
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link onClick={toggleMenu} activeClass="font-semibold text-[#00ffe0]" to={link.to} spy={true} smooth={true} offset={-80} duration={500} className="block py-2 hover:text-[#00ffe0] transition-colors duration-300">{link.label}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const BackgroundEffect = () => (
  <div className="fixed top-0 left-0 w-full h-full z-0 animate-gradient-x bg-[length:300%_300%] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] opacity-60" />
);

const FloatingLabelInput = ({ id, type, children, ...props }) => (
    <div className="relative">
      <input id={id} type={type} placeholder=" " className="peer w-full px-4 py-3 text-sm bg-white/10 backdrop-blur-md text-white border border-gray-500/40 rounded-md placeholder-transparent focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition duration-300" {...props} />
      <label htmlFor={id} className="absolute left-4 top-3 text-gray-300 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:translate-y-0 peer-focus:text-xs peer-focus:-translate-y-5">
        {children}
      </label>
    </div>
);
  
const FloatingLabelTextarea = ({ id, children, ...props }) => (
    <div className="relative">
      <textarea id={id} placeholder=" " className="peer w-full px-4 py-3 text-sm bg-white/10 backdrop-blur-md text-white border border-gray-500/40 rounded-md placeholder-transparent focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition duration-300" rows="5" {...props}></textarea>
      <label htmlFor={id} className="absolute left-4 top-3 text-gray-300 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:translate-y-0 peer-focus:text-xs peer-focus:-translate-y-5">
        {children}
      </label>
    </div>
);

export default function App() { 
  const [showButton, setShowButton] = useState(false);
  const roadmapItems = [
    { status: 'completed', text: 'Algoritmos e Estrutura de Dados' },
    { status: 'completed', text: 'Git e Versionamento' },
    { status: 'completed', text: 'HTML, CSS, JS, React' },
    { status: 'completed', text: 'Python + Django + PostgreSQL' },
    { status: 'completed', text: 'Selenium / Streamlit' },
    { status: 'in_progress', text: 'TypeScript + Node.js' },
    { status: 'planned', text: 'Docker e Conteinerização' },
  ];
  const getRoadmapIcon = (status) => {
    switch (status) {
      case 'completed': return <CircleCheck className="text-[#00ffe0]" />;
      case 'in_progress': return <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}><CircleDashed className="text-yellow-400" /></motion.div>;
      case 'planned': return <Rocket className="text-indigo-400" />;
      default: return null;
    }
  };

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_PUBLIC_KEY')
      .then(() => alert('Mensagem enviada com sucesso!'))
      .catch(() => alert('Erro ao enviar. Tente novamente.'));
    e.target.reset();
  };

  return (
    <div className="relative min-h-screen text-[#e0e0e0] font-sans">
      <BackgroundEffect />
      <TopNavbar />
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 space-y-32">
        <Element name="home" className="scroll-mt-32">
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="min-h-[50vh] flex flex-col items-center justify-center text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Bruno Antonio</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">Desenvolvedor Full Stack com foco em criar soluções web elegantes e performáticas, unindo a robustez do back-end com a fluidez do front-end.</p>
            <div className="mt-8 flex gap-6">
                <a href="https://github.com/brunosousa09" target="_blank" rel="noopener noreferrer" className="text-[#00ffe0] hover:scale-125 transition-transform"><Github size={32} /></a>
                <a href="https://linkedin.com/in/brunosousa09" target="_blank" rel="noopener noreferrer" className="text-[#00ffe0] hover:scale-125 transition-transform"><Linkedin size={32} /></a>
            </div>
          </motion.section>
        </Element>
        <Element name="stack" className="scroll-mt-32">
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl font-bold text-center mb-12">Minha <span className="text-[#00ffe0]">Stack</span></h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8">
              {["python", "java", "nodejs", "django", "react", "typescript", "javascript", "html", "css", "tailwindcss", "postgresql", "mysql", "docker", "git"].map(tech => (
                <motion.div key={tech} className="flex flex-col items-center gap-2 text-center" whileHover={{ scale: 1.1 }}>
                  <img src={`https://skillicons.dev/icons?i=${tech}`} alt={tech} className="h-16 w-16" />
                  <span className="text-sm text-gray-400 capitalize">{tech}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </Element>
        <Element name="sobre-mim" className="scroll-mt-32">
           <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl font-bold text-center mb-12"><span className="text-[#00ffe0]">Sobre</span> Mim</h2>
            <p className="text-gray-300 text-lg text-center max-w-3xl mx-auto leading-relaxed">Sou um entusiasta da tecnologia e inovação, sempre em busca de novos desafios e aprendizados. Minha jornada no desenvolvimento de software é movida pela paixão de construir ferramentas que resolvem problemas reais e impactam positivamente a vida das pessoas.</p>
           </motion.section>
        </Element>
        <Element name="roadmap" className="scroll-mt-32">
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
            <h2 className="text-3xl font-bold text-center mb-16">Meu <span className="text-[#00ffe0]">Roadmap</span> de Estudos</h2>
            <div className="relative max-w-2xl mx-auto before:content-[''] before:absolute before:left-1/2 before:w-0.5 before:h-full before:bg-[#333] before:-translate-x-1/2">
              {roadmapItems.map((item, index) => (
                <motion.div key={index} className="relative flex items-center mb-12" initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left ml-auto'}`}>
                    <div className="inline-flex items-center gap-3 p-4 bg-[#1a1a1a] border border-[#333] rounded-lg shadow-md">
                      <p className="font-medium">{item.text}</p>
                      {getRoadmapIcon(item.status)}
                    </div>
                  </div>
                  <div className="absolute left-1/2 w-4 h-4 bg-[#00ffe0] rounded-full -translate-x-1/2 border-4 border-[#0d0d0d]"></div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </Element>
        <Element name="contato" className="scroll-mt-32">
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800/50 p-8 sm:p-12 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-16 items-start">
                <div>
                  <h2 className="text-4xl font-bold mb-4">Vamos <span className="text-white">Conversar</span></h2>
                  <p className="text-gray-400 text-lg">Tem uma ideia, um projeto ou uma oportunidade? Adoraria ouvir sobre isso. Preencha o formulário ou entre em contato por um dos meus canais.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                  <FloatingLabelInput id="user_name" name="user_name" type="text" required>Nome Completo</FloatingLabelInput>
                  <FloatingLabelInput id="user_email" name="user_email" type="email" required>Email</FloatingLabelInput>
                  <FloatingLabelInput id="subject" name="subject" type="text" required>Assunto</FloatingLabelInput>
                  <FloatingLabelTextarea id="message" name="message" required>Mensagem</FloatingLabelTextarea>
                  <button type="submit" className="w-full group flex items-center justify-center gap-3 bg-white text-black font-bold py-3 rounded-lg text-lg hover:bg-gray-200 transition-all duration-300 hover:scale-[1.03]">
                    Enviar Mensagem <Send size={20} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </div>
          </motion.section>
        </Element>
        <footer className="text-center text-gray-500 text-sm py-8 mt-16 border-t border-gray-800/50">
           © {new Date().getFullYear()} Bruno Antonio. Todos os direitos reservados.
        </footer>
      </main>
      <AnimatePresence>
        {showButton && (
          <motion.button onClick={scrollToTop} className="fixed bottom-5 right-5 p-3 bg-[#00ffe0] text-black rounded-full shadow-lg hover:scale-110 transition-transform z-50" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
            <ArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
