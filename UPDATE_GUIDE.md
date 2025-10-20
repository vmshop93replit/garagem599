# Guia de Atualização - Sistema de Cache Busting

## Visão Geral

O sistema de cache busting garante que os usuários sempre vejam a versão mais atualizada do site, forçando a limpeza do cache e reload automático quando uma nova versão é detectada.

## Como Funciona

### 1. Service Worker
- Arquivo: `public/service-worker.js`
- Estratégia: **Network First** (sempre tenta buscar do servidor primeiro, cache como fallback)
- Versão: Definida na constante `CACHE_VERSION`
- Auto-ativação: Nova versão é ativada automaticamente sem precisar de confirmação do usuário

### 2. Verificação de Versão Dupla
O sistema usa **duas camadas** de verificação para máxima confiabilidade:

#### Camada 1: Service Worker Updates
- Verifica atualizações do service-worker.js a cada 5 minutos
- Quando novo SW é detectado, ativa automaticamente e recarrega a página
- Limpa todo o cache antes do reload

#### Camada 2: Version.json Polling
- Consulta `/version.json` a cada 5 minutos (independente do SW)
- Compara versão no arquivo com `APP_VERSION` no código
- Se versão diferir, força reload automático **mesmo se o SW não mudou**
- Garante atualização mesmo em deployments onde apenas conteúdo muda

### 3. Controle de Cache
- Headers HTTP configurados no `vercel.json`
- Meta tags no `client/index.html`
- Arquivos críticos (service-worker.js, version.json, index.html) nunca são cacheados
- Assets estáticos (JS, CSS, imagens) são cacheados com hash único (imutável por 1 ano)

## Como Atualizar a Versão do Site

### Passo 1: Atualizar o Número da Versão
Sempre que fizer mudanças importantes no site, atualize a versão em **4 arquivos**:

1. **public/service-worker.js**
   ```javascript
   const CACHE_VERSION = 'v1.0.1'; // Incremente aqui
   ```

2. **client/src/lib/version-check.ts**
   ```typescript
   export const APP_VERSION = '1.0.1'; // Incremente aqui
   ```

3. **public/version.json**
   ```json
   {
     "version": "1.0.1",
     "lastUpdated": "2025-10-20T19:00:00Z"
   }
   ```

4. **client/index.html**
   ```html
   <meta name="app-version" content="1.0.1">
   ```

### Passo 2: Build e Deploy
1. Faça commit das mudanças
2. Build: `npm run build` (gera `dist/public`)
3. Deploy no Vercel (automático via Git push)
4. Os usuários serão atualizados **automaticamente** em até 10 minutos

## Comportamento do Usuário

### Primeira Visita
- Service worker é registrado automaticamente
- Arquivos são cacheados localmente para performance
- Versão é salva no sessionStorage

### Atualizações Automáticas
Duas verificações paralelas e independentes:

#### Via Service Worker
1. A cada 5 minutos, verifica se há novo service-worker.js
2. Se detectar novo SW, ativa automaticamente
3. Limpa cache e recarrega a página
4. **Sem popup ou confirmação** - totalmente automático

#### Via version.json
1. 10 segundos após carregar a página, faz primeira verificação
2. Depois, verifica a cada 5 minutos
3. Se `version.json` tiver versão diferente de `APP_VERSION`:
   - Mostra notificação visual: "✨ Nova versão disponível! Atualizando..."
   - Limpa todos os caches
   - Recarrega automaticamente após 1 segundo
4. **Funciona mesmo se o service-worker.js não mudou**

### Mudança de Versão no sessionStorage
- Ao detectar mudança de versão salva:
  - Limpa todos os caches
  - Preserva apenas os agendamentos (localStorage: garagem599_bookings)
  - Atualiza versão no sessionStorage

## Estratégia de Versionamento

Recomendamos seguir o padrão [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.x.x): Mudanças que quebram compatibilidade
- **MINOR** (x.1.x): Novas funcionalidades mantendo compatibilidade
- **PATCH** (x.x.1): Correções de bugs e pequenas melhorias

### Exemplos:
- `1.0.0` → `1.0.1`: Correção de bug visual
- `1.0.1` → `1.1.0`: Nova seção adicionada ao site
- `1.1.0` → `2.0.0`: Reestruturação completa do sistema de agendamento

## Quando Atualizar a Versão?

### Sempre Atualize (PATCH ou MINOR)
- Correção de bugs visuais ou funcionais
- Mudanças em textos ou conteúdo
- Novos serviços ou preços
- Melhorias de UX/UI
- Otimizações de performance
- Atualizações de imagens ou vídeos

### Pode Não Atualizar
- Mudanças apenas em código de desenvolvimento/teste
- Atualizações de documentação (README, guides)
- Mudanças em arquivos de configuração que não afetam o build final

## Cache Strategy por Tipo de Arquivo

| Arquivo | Estratégia | Motivo |
|---------|-----------|---------|
| `index.html` | No Cache | Sempre buscar versão mais recente |
| `service-worker.js` | No Cache | Detectar atualizações do SW imediatamente |
| `version.json` | No Cache | Verificar versão atual a cada request |
| `/assets/*` | Cache Longo (1 ano) | Hash único garante que novo conteúdo tem novo nome |

## Testando Localmente

### Verificar Service Worker (Produção)
```bash
# Build de produção
npm run build

# Servir build local
npx serve dist/public

# Abrir em: http://localhost:3000
```

1. Abra DevTools → Application → Service Workers
2. Você deve ver o service worker registrado
3. Mude a versão nos 4 arquivos
4. Faça novo build e sirva
5. Aguarde até 10 segundos - reload automático deve ocorrer

### Verificar Verificação de Versão
Abra o console do navegador:
```javascript
// Ver versão atual
checkVersion()

// Forçar reload manual
forceReload()
```

### Verificar Cache
1. DevTools → Application → Cache Storage
2. Deve haver cache `garagem599-v1.0.0` (ou versão atual)
3. Ao atualizar versão, cache antigo é deletado automaticamente

## Troubleshooting

### Usuários não veem atualização imediatamente
**Normal!** O sistema verifica a cada 5 minutos. No máximo em 10 minutos todos os usuários ativos terão a nova versão.

**Para forçar atualização imediata:**
1. Peça ao usuário para recarregar a página com `Ctrl+Shift+R` (Win/Linux) ou `Cmd+Shift+R` (Mac)
2. Ou simplesmente aguardar - a atualização será automática

### Service Worker não atualiza
1. Feche todas as abas do site
2. Abra novamente
3. Service worker será atualizado na próxima carga

### Cache persistente após atualização
- Verifique se atualizou versão nos **4 arquivos**
- Confirme que deploy foi bem-sucedido no Vercel
- Vercel pode ter cache próprio (aguardar TTL ou fazer purge via dashboard)
- CDN pode ter cache adicional

### Erro "Service Worker registration failed" em dev
**Normal!** Service worker só funciona em produção (`import.meta.env.PROD === true`). 
Em desenvolvimento, você verá: `[Version Check] Disabled in development mode`

## Boas Práticas

1. **Sempre incremente a versão** antes de deploy de mudanças visíveis
2. **Atualize todos os 4 arquivos** de uma vez (evita inconsistências)
3. **Documente mudanças** em cada versão (opcional: criar CHANGELOG.md)
4. **Teste localmente** antes de atualizar produção
5. **Preserve dados do usuário** (bookings) ao limpar cache
6. **Monitore logs** no console para verificar se sistema está funcionando

## Notificação Visual de Atualização

Quando nova versão é detectada via version.json, o usuário vê uma notificação flutuante:

```
┌─────────────────────────────────────┐
│ ✨ Nova versão disponível!          │
│    Atualizando...                   │
└─────────────────────────────────────┘
```

- Aparece no canto superior direito
- Design: Gradiente azul, sombra, animação suave
- Duração: 1 segundo antes do reload
- Não requer interação do usuário

## Fluxo Completo de Atualização

```
1. Desenvolvedor atualiza 4 arquivos com nova versão
   ↓
2. Git push → Vercel build → Deploy
   ↓
3. Usuário já está com site aberto
   ↓
4. Service Worker verifica atualizações a cada 5min
   OU version.json é consultado a cada 5min
   ↓
5. Nova versão detectada!
   ↓
6. Sistema limpa todos os caches
   (preserva apenas bookings)
   ↓
7. Notificação visual aparece
   "✨ Nova versão disponível! Atualizando..."
   ↓
8. Após 1 segundo → window.location.reload()
   ↓
9. Página recarrega com nova versão
   ↓
10. Novo cache é criado com versão atualizada
```

## Arquivos Relacionados

- `public/service-worker.js` - Service Worker principal com estratégia Network First
- `client/src/lib/version-check.ts` - Lógica de verificação dupla (SW + version.json)
- `public/version.json` - Arquivo de versão para comparação remota
- `client/index.html` - Meta tags de cache e versão
- `vercel.json` - Headers HTTP de cache por tipo de arquivo
- `DEPLOY.md` - Guia de deploy e resumo do sistema
- `UPDATE_GUIDE.md` - Este guia completo

## Comandos Úteis

```bash
# Ver versão atual em produção
curl https://seu-dominio.com/version.json

# Forçar limpeza de cache no navegador
# (Abrir console e executar)
forceReload()

# Verificar versão local
checkVersion()

# Build de produção local
npm run build

# Servir build local
npx serve dist/public
```

---

**🎉 Com este sistema, seus usuários sempre terão a versão mais atualizada do site!**
