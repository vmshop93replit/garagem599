# 🚀 Guia de Deploy - Garagem 599

## ✅ Resumo do Projeto

Seu site está **100% pronto** para deploy! A aplicação é completamente estática (não precisa de servidor backend), o que significa que funciona perfeitamente no Vercel.

## 📋 Pré-requisitos

1. Conta no GitHub
2. Conta no Vercel (pode usar login do GitHub)
3. Domínio configurado no Hostinger

## 🔧 Passos para Deploy

### 1. Enviar para GitHub

```bash
# No terminal do seu projeto:
git add .
git commit -m "Site Garagem 599 finalizado - pronto para deploy"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/garagem-599.git
git push -u origin main
```

### 2. Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "New Project"
4. Selecione o repositório "garagem-599"
5. **Importante**: Deixe as configurações padrão (o arquivo `vercel.json` já está configurado)
6. Clique em "Deploy"

### 3. Configurar Domínio no Hostinger

1. No painel do Vercel, vá em "Settings" > "Domains"
2. Adicione seu domínio personalizado
3. No Hostinger, configure os DNS:
   - **Tipo**: CNAME
   - **Nome**: www
   - **Valor**: cname.vercel-dns.com
   - **TTL**: 14400

   - **Tipo**: A
   - **Nome**: @
   - **Valor**: 76.76.19.61
   - **TTL**: 14400

## 🎯 Características da Aplicação

✅ **Site Estático**: Funciona sem servidor backend  
✅ **WhatsApp Integration**: Booking direto pelo WhatsApp  
✅ **Responsivo**: Otimizado para mobile e desktop  
✅ **Performance**: Build otimizado para produção  
✅ **SEO Ready**: Meta tags configuradas  

## 📱 Funcionalidades

- ✅ Hero com vídeo background (marca d'água removida)
- ✅ Galeria com 20+ imagens do negócio
- ✅ Serviços para carros e motos
- ✅ Sistema de booking via WhatsApp
- ✅ Design premium com animações suaves
- ✅ Totalmente responsivo

## 🔍 Estrutura de Build

```
dist/public/
├── index.html          # Página principal
├── service-worker.js   # Controle de cache (atualização automática)
├── version.json        # Arquivo de versão
├── assets/            # Todos os recursos otimizados
│   ├── *.css         # Estilos minificados
│   ├── *.js          # JavaScript otimizado
│   ├── *.jpg/png     # Imagens do negócio
│   └── *.mp4         # Vídeos de fundo
```

## 🔄 Sistema de Atualização Automática

O site possui um **sistema inteligente de cache** que:

✅ **Garante que usuários sempre vejam a versão mais atualizada**  
✅ **Notifica automaticamente quando há atualização**  
✅ **Força limpeza de cache quando necessário**  
✅ **Funciona offline como PWA**

### Como Funciona

1. **Service Worker**: Controla o cache com estratégia "Network First"
2. **Verificação Automática**: Checa nova versão a cada 5 minutos
3. **Notificação ao Usuário**: Popup quando atualização disponível
4. **Cache Inteligente**: Assets estáticos são cacheados com hash único

### Atualizando o Site

Sempre que fizer alterações importantes, **atualize a versão** em 4 arquivos:

1. `public/service-worker.js` → `CACHE_VERSION`
2. `client/src/lib/version-check.ts` → `APP_VERSION`
3. `public/version.json` → `version`
4. `client/index.html` → `<meta name="app-version">`

**Exemplo**: Mudar de `1.0.0` para `1.0.1`

📖 **Guia completo**: Veja `UPDATE_GUIDE.md` para instruções detalhadas

## 🌐 Pós Deploy

Após o deploy estar ativo:

1. **Teste o site** em diferentes dispositivos
2. **Verifique o WhatsApp** - links devem abrir o app
3. **Confirme as imagens** - todas devem carregar rapidamente
4. **Teste a responsividade** em mobile

## 📞 Contato WhatsApp Configurado

- **Número**: +55 12 98709-2879
- **Mensagem padrão**: Automática com dados do serviço

---

**🎉 Seu site está pronto para impressionar os clientes!**