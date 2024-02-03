Overview of a Single Page Application (SPA)
-------------------------------------------

Uma Single Page Application (SPA) é um tipo de aplicativo web ou site que interage com o usuário ao reescrever dinamicamente a página atual, em vez de carregar páginas inteiras do servidor. Isso resulta em uma experiência mais fluida e semelhante a um aplicativo de desktop.

### Quando Usar uma SPA

*   **Aplicações Interativas**: SPAs são ideais para aplicações que requerem interações frequentes do usuário e atualizações dinâmicas sem recarregar a página.
    
*   **Experiência de Usuário Aprimorada**: Use SPAs para aplicativos onde a experiência do usuário é uma prioridade, como painéis de controle e aplicativos de produtividade.
    
*   **Projetos com Frameworks Modernos**: Projetos que fazem uso de frameworks como React, Angular, Vue.js, etc., se beneficiam do modelo SPA, mas aqui é javascript puro para mostrar que não é só com frameworks que se faz bons SPA.
    

### Vantagens

*   **Desempenho Melhorado**: Carregar uma única página e atualizar apenas as partes necessárias pode resultar em um desempenho mais rápido comparado a um site tradicional multi-página.
    
*   **Experiência de Usuário Suave**: A navegação entre seções do aplicativo é geralmente mais rápida e mais suave, sem o piscar de uma recarga de página.
    
*   **Desenvolvimento Simplificado**: Com frameworks adequados, o desenvolvimento e manutenção de SPAs podem ser mais diretos devido à separação de frontend e backend.
    

### Desvantagens

*   **SEO Complicado**: SPAs podem enfrentar desafios com SEO, pois o conteúdo dinâmico não é facilmente indexado pelos motores de busca sem técnicas adicionais como SSR (Server-Side Rendering).
O método updateMetaTags(title, description, keywords) do arquivo Router se porpõe a resolver essa parte
    
*   **Primeiro Carregamento**: O primeiro carregamento pode ser mais lento, pois todo o aplicativo precisa ser carregado de uma vez, embora técnicas como Lazy Loading e Code Splitting possam ajudar.
O método preloadComponents() do arquivo Router se porpõe a resolver essa parte.
    
*   **Navegadores Antigos**: Pode haver problemas de compatibilidade com navegadores mais antigos que não suportam todas as APIs necessárias para SPAs.
Ao colocar type="module" na referencia do arquivo javascript principal, se porpõe a resolver essa parte.

### Detalhes Especiais dos Arquivos

*   **FetchData.js**: Um módulo utilitário para realizar requisições de API e lidar com respostas JSON, é uma chamada genérica que pode ser usada por qualquer outra classe.
    
*   **Navbar.js**: Um componente que renderiza a barra de navegação e lida com a interação do usuário para a navegação entre as páginas, centralizando assim os links que serão carregadas em todas as "páginas".
    
*   **Router.js**: O coração da SPA, gerenciando as rotas e o carregamento de páginas/componentes através de uma abordagem de lazy loading, melhorando o desempenho inicial.
    
*   **Páginas (AboutPage, ContactPage, etc.)**: Implementações de páginas específicas que são carregadas dinamicamente pelo router.
    

### Padrões de Projeto

*   **Module Pattern**: Os componentes e páginas são modularizados, promovendo a separação de preocupações e a reutilização de código.
    
*   **Singleton Pattern no Router**: Há uma única instância do router que gerencia todo o estado das rotas e navegação.
    
*   **Observer Pattern para Eventos**: Eventos do DOM são usados para escutar e responder a ações do usuário, como cliques de navegação.
    

### Melhorias para o Service Worker

O Service Worker implementado utiliza uma estratégia de cache-first para ativos estáticos. Algumas melhorias incluem:

*   **Cache Estratégico**: Implemente estratégias de cache diferentes para diferentes tipos de recursos, como stale-while-revalidate para API calls, fazendo com que após carregar os arquivos do servidor eles fiquem em cache no navegador do usuario, para que não precise buscar no servidor a todo carregamento e se a internet cair ou limitação de conexão o usuário não precisa esperar o novo carregamento.
    
*   **Atualizações de Cache**: Automatize o processo de atualização de cache quando novas versões dos arquivos são disponibilizadas.
    

### Simulação de Conexão Offline

Para simular uma conexão offline:

1.  Abra as DevTools no Chrome (F12 ou Ctrl+Shift+I).
    
2.  Vá para a aba "Network".
- antes do passo três acesse o sistema a primeira vez, e navegue em todos os links.
- neste SPA exclusivamente possui uma estrategia para indexação e atualização de meta tag para os motores de busca, melhorando assim apontuação de SEO
    
3.  Selecione "Offline" na lista de perfis de throttling para simular uma conexão offline.
    
4.  Navegue na aplicação e observe como o Service Worker lida com as requisições.
    

Esta documentação serve como um guia para entender, desenvolver e otimizar SPAs. As técnicas e estratégias mencionadas devem ser adaptadas conforme as necessidades específicas do projeto, pois esse modelo possui a pretenção de ser um modelo que poderá ser expandido de forma muito fácil.

### Adicionando novas páginas

Para adicionar novas páginas e para funcionar corretamente a navegação, basta criarr um novo componente nos padrões dos componentes que estão na pasta "assets/js/pages".
Exemplo simples é o componente AboutPage
```
import Component from '../component/Component.js';

class AboutPage extends Component {
    constructor() {
        super();
        this.title = 'Sobre - Meu SPA';
        this.description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
        this.keywords = 'sobre,nós,equipe,história';
    }

    render() {
        return `<div>${this.description}</div>`;
    }
}

export default AboutPage;
```

após criar classe componente no padrão acima, basta colocar o link de acesso que é a URL amigável que deve ser colocada também no em no arquivo Router na propriedade route
Navbar
```
<div id="myNav" class="overlay">
    <div class="overlay-content">
        <a href="/">Home</a>
        <a href="/about">Sobre</a>
        <a href="/contact">Contato</a>
    </div>
</div>
```

Router
```
this.routes = {
        '/': 'HomePage',
        '/about': 'AboutPage',
        '/contact': 'ContactPage'
        };
```