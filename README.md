# MáquinaPro — Site e Área Administrativa Separados

O site principal não contém a tela de login.

## Site principal
Abra `index.html`.

## Área administrativa
Abra `admin/login.html`.

Login inicial:
- Usuário: `admin`
- Senha: `admin123`

O administrador pode cadastrar, editar e excluir registros e alterar categoria, quantidade e status da frota.

Os dados compartilhados entre as duas áreas usam `localStorage` neste protótipo. Para produção, recomenda-se migrar para servidor + banco de dados.


## Apresentação da empresa
A apresentação institucional foi colocada acima do dashboard do site principal, com uma foto de máquina pesada à esquerda e o texto da empresa à direita. A foto utilizada é de Anasskoko, no Wikimedia Commons, licenciada sob CC BY-SA 4.0.


## Atualização de registro
A área administrativa agora normaliza o campo Registro (maiúsculas/espaços) e impede duplicidade ao cadastrar ou editar. Também foi incluído `php/cadastrar_frota.php` e `php/bloquear_registro_duplicado.sql` como base para uma versão PHP/MySQL.


## Área de comunicação
Foi adicionada uma área pública de comunicados no site e uma área administrativa para criar, publicar/despublicar e excluir comunicados. Nesta versão os comunicados usam localStorage compartilhado entre as páginas do mesmo navegador.


## Fale Conosco / WhatsApp
Foi adicionada uma seção Fale Conosco com botão direto para WhatsApp. Para ativar o número real, abra `script.js` e altere `WHATSAPP_NUMERO` para o número da empresa no formato internacional, somente números (ex.: 5571999999999). O botão abre o WhatsApp com uma mensagem inicial pronta.


## Ajuste de layout
A área de Comunicação foi removida. A área Fale Conosco foi posicionada imediatamente abaixo da seção da frota.


## Visual moderno
O CSS do site principal e do painel administrativo foi renovado com visual moderno, responsivo, cards, sombras suaves, gradientes, estados de foco e melhor adaptação para celular.


## Logo e visual
A nova logo MáquinaPro foi adicionada ao site principal, login e painel administrativo. O CSS foi refinado para um visual mais moderno, com melhor hierarquia visual, sombras, responsividade, estados de interação e apresentação da marca.


## Novo visual
A página principal foi redesenhada para seguir a referência enviada: cabeçalho corporativo escuro, hero de alto impacto, cards de benefícios, seções Sobre Nós e Serviços, Frota, Fale Conosco/WhatsApp e rodapé. A logo MáquinaPro foi mantida em todos os pontos de marca.


## Correções da atualização
Removida duplicação da área Fale Conosco, removidos elementos duplicados da apresentação da Frota e ajustado o posicionamento para deixar uma única área Fale Conosco logo abaixo da Frota.


## Correção do Fale Conosco
Corrigido o erro estrutural que colocava o Fale Conosco dentro da seção da Frota. O componente agora possui uma estrutura HTML independente e CSS isolado, com versão responsiva para celular.


## Ajuste da área Frota
A área da frota recebeu um CSS independente e moderno: tabela limpa, cabeçalho azul, status em badges, formulários organizados, botões modernos, cards e responsividade. O objetivo é eliminar o aspecto de caixas duplicadas e manter a área alinhada ao visual MáquinaPro.


## Centralização da Frota
A seção Frota foi centralizada com largura máxima de 1180px e margens automáticas, removendo deslocamentos laterais e conflitos com a classe panel. O título duplicado interno também foi removido.


## Status dinâmicos da Frota
Os status agora mudam de cor conforme o valor atualizado: Disponível (verde), Em operação/Alugada (azul), Em manutenção (amarelo), Reservada (roxo) e Indisponível (vermelho). A cor é reaplicada automaticamente quando a tabela é atualizada sem recarregar a página.
