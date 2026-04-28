// ==========================================
// ESTADO GLOBAL DA APLICAÇÃO (STATE)
// ==========================================
let currentUser = null;
let isPremium = false;

// ==========================================
// BANCO DE DADOS SIMULADO (MOCK DATA)
// ==========================================
const jobs = [
    {
        id: 1,
        title: 'Desenvolvimento de Site E-commerce',
        company: 'TechStore Brasil',
        category: 'desenvolvimento',
        description: 'Preciso de um desenvolvedor full stack para criar um site e-commerce completo com carrinho de compras, sistema de pagamento e painel admin.',
        price: 3500,
        tags: ['React', 'Node.js', 'MongoDB'],
        posted: '2 dias atrás'
    },
    {
        id: 2,
        title: 'Logo e Identidade Visual',
        company: 'Café Artesanal',
        category: 'design',
        description: 'Busco designer para criar logo moderno e identidade visual completa para cafeteria boutique.',
        price: 1200,
        tags: ['Logo', 'Branding', 'Illustrator'],
        posted: '3 dias atrás'
    },
    {
        id: 3,
        title: 'Redação de Artigos para Blog',
        company: 'Marketing Pro',
        category: 'redacao',
        description: 'Preciso de redator para produzir 10 artigos sobre marketing digital, SEO e growth hacking.',
        price: 800,
        tags: ['Copywriting', 'SEO', 'Marketing'],
        posted: '1 dia atrás'
    },
    {
        id: 4,
        title: 'Edição de Vídeos para YouTube',
        company: 'Canal Tech',
        category: 'video',
        description: 'Procuro editor de vídeo para canal de tecnologia no YouTube. Estilo descontraído e dinâmico.',
        price: 600,
        tags: ['Premiere', 'After Effects'],
        posted: '5 dias atrás'
    },
    {
        id: 5,
        title: 'Gestão de Redes Sociais',
        company: 'Loja Fashion',
        category: 'marketing',
        description: 'Preciso de especialista em marketing digital para gerenciar Instagram e Facebook da loja.',
        price: 1500,
        tags: ['Instagram', 'Facebook', 'Ads'],
        posted: '4 dias atrás'
    },
    {
        id: 6,
        title: 'Tradução de Site',
        company: 'Exportadora Global',
        category: 'traducao',
        description: 'Tradução do site empresarial do português para inglês e espanhol.',
        price: 450,
        tags: ['Português', 'Inglês', 'Espanhol'],
        posted: '6 dias atrás'
    }
];

// ==========================================
// SISTEMA DE NAVEGAÇÃO (SPA)
// ==========================================
function navigateTo(pageId) {
    // 1. Esconde todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 2. Mostra a página alvo
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 3. Atualiza o estado "ativo" no menu de navegação
    document.querySelectorAll('#mainNav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // 4. Rola a página para o topo
    window.scrollTo(0, 0);
}

// ==========================================
// SISTEMA DE AUTENTICAÇÃO (LOGIN/REGISTRO)
// ==========================================
function handleLogin(event) {
    event.preventDefault(); // Evita que a página recarregue
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simula o login se os campos estiverem preenchidos
    if (email && password) {
        currentUser = { name: 'Usuário', email: email };
        updateAuthUI();
        navigateTo('dashboard');
        showToast('Login realizado com sucesso!', 'success');
    }
}

function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const type = document.getElementById('registerType').value;
    
    // Simula o registro
    if (name && email) {
        currentUser = { name: name, email: email, type: type };
        updateAuthUI();
        navigateTo('dashboard');
        showToast('Conta criada com sucesso!', 'success');
    }
}

function logout() {
    currentUser = null;
    isPremium = false; // Reseta o status premium ao sair
    updateAuthUI();
    navigateTo('home');
    showToast('Logout realizado!', 'success');
}

// Atualiza a interface baseada no status de login do usuário
function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const userAvatar = document.getElementById('userAvatar');
    const profileName = document.getElementById('profileName');
    const profileAvatar = document.getElementById('profileAvatar');
    const planType = document.getElementById('planType');
    const planFee = document.getElementById('planFee');
    
    if (currentUser) {
        // Usuário Logado: Esconde botões de login e mostra o menu do usuário
        if(authButtons) authButtons.style.display = 'none';
        if(userMenu) userMenu.style.display = 'flex';
        if(userAvatar) userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
        
        // Atualiza dados no Dashboard/Perfil se eles existirem na tela
        if (profileName) profileName.textContent = currentUser.name;
        if (profileAvatar) profileAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
        if (planType) planType.textContent = isPremium ? 'Premium' : 'Gratuito';
        if (planFee) planFee.textContent = isPremium ? 'Taxa: 0%' : 'Taxa: 20%';
    } else {
        // Usuário Deslogado: Mostra botões de login e esconde menu do usuário
        if(authButtons) authButtons.style.display = 'flex';
        if(userMenu) userMenu.style.display = 'none';
    }
}

// ==========================================
// INTERAÇÕES DE MENU E UPGRADE
// ==========================================

// Abre/Fecha o menu suspenso (dropdown) do usuário
document.getElementById('userMenu')?.addEventListener('click', function(e) {
    const dropdown = document.getElementById('userDropdown');
    if(dropdown) dropdown.classList.toggle('show');
    e.stopPropagation(); // Evita que o clique se propague e feche imediatamente
});

// Fecha o menu suspenso se o usuário clicar fora dele
document.addEventListener('click', function() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) dropdown.classList.remove('show');
});

// Função para se tornar Premium
function upgradeToPremium() {
    if (!currentUser) {
        navigateTo('login');
        showToast('Faça login para fazer o upgrade!', 'error');
        return;
    }
    
    isPremium = true;
    updateAuthUI();
    showToast('Parabéns! Você agora é Premium!', 'success');
}

// ==========================================
// GERENCIAMENTO DE PROJETOS (JOBS)
// ==========================================

// Renderiza a lista de projetos na tela
function renderJobs(jobsToRender) {
    const jobsList = document.getElementById('jobsList');
    if (!jobsList) return;
    
    jobsList.innerHTML = jobsToRender.map(job => `
        <div class="job-card">
            <div class="job-card-header">
                <div>
                    <h3>${job.title}</h3>
                    <p class="company">${job.company}</p>
                </div>
            </div>
            <p class="description">${job.description}</p>
            <div class="tags">
                ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="footer">
                <span class="price">R$ ${job.price.toLocaleString('pt-BR')}</span>
                <span class="posted">${job.posted}</span>
            </div>
        </div>
    `).join('');
}

// Filtra os projetos por categoria e preço
function filterJobs(category) {
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    
    let filtered = [...jobs];
    
    const selectedCategory = category || categoryFilter?.value || '';
    const selectedPrice = priceFilter?.value || '';
    
    // Filtro de Categoria
    if (selectedCategory) {
        filtered = filtered.filter(job => job.category === selectedCategory);
    }
    
    // Filtro de Preço
    if (selectedPrice) {
        if (selectedPrice === '0-500') {
            filtered = filtered.filter(job => job.price <= 500);
        } else if (selectedPrice === '500-2000') {
            filtered = filtered.filter(job => job.price > 500 && job.price <= 2000);
        } else if (selectedPrice === '2000+') {
            filtered = filtered.filter(job => job.price > 2000);
        }
    }
    
    renderJobs(filtered);
    navigateTo('jobs');
}

// ==========================================
// UTILITÁRIOS (TOAST E MOBILE MENU)
// ==========================================

// Mostra a notificação flutuante na tela
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if(!toast) return;
    
    toast.textContent = message;
    toast.className = 'toast ' + type;
    toast.classList.add('show');
    
    // Remove a notificação após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Controle do Menu Mobile (Hambúrguer)
document.querySelector('.mobile-menu-btn')?.addEventListener('click', function() {
    const nav = document.querySelector('header nav');
    if (!nav) return;
    
    if (nav.style.display === 'flex') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'flex';
        nav.style.position = 'absolute';
        nav.style.top = '100%';
        nav.style.left = '0';
        nav.style.width = '100%';
        nav.style.background = 'white';
        nav.style.padding = '1rem';
        nav.style.flexDirection = 'column';
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    }
});

// ==========================================
// INICIALIZAÇÃO DA PÁGINA
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    renderJobs(jobs); // Carrega os projetos iniciais
    updateAuthUI();   // Ajusta os botões do cabeçalho
});