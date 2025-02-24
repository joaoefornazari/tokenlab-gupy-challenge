# TOKENLAB GUPY CHALLENGE

Este projeto full-stack é para o desafio técnico do processo seletivo da Tokenlab.

## Dependências do projeto:
- Backend:
  - NPM 8
  - Node 22
  - Sequelize 6
  - MySQL 8
  - Express 4
- Frontend:
  - Angular 19

## Rodando o projeto localmente

- Faça `git clone <link_do_repositorio>` e depois, abra dois terminais.
- No primeiro terminal, rode os seguintes comandos:

```
cd backend
npm i
npm run dev
```

- No segundo terminal, rode os seguintes comandos:

```
cd frontend
npm i -g @angular/cli
npm i
ng serve
```

- No seu navegador, acesse o endereço `http://localhost:4200` e você será redirecionado para o `home` do projeto.

## DISCLAIMERS

- Existem commits depois das 23:30 do dia 23/02/2025 porque, por mais que o texto do desafio expunha que o teste teria 7 dias de duração, o desafio mostrava um contador que nunca chegava a zerar, por mais que eu deixei por 5 dias aberto direto; e também tem a descrição da etapa na Gupy que diz que a duração da etapa seria 10080 minutos. Com base nisso, supus que o desafio duraria até dia 24/02/2025 às 12:30 minutos. Porém, como eu não queria deixar de enviar o link caso minha suposição estivesse errada e pensando no pior caso (que seria de a entrada da etapa fechar no domingo), eu resolvi enviar o link às 23:30 do dia 23/02/2025 e continuar programando as atividades restantes até o suposto horário de entrega do projeto.
- Entrei em contato com um funcionário da TokenLab que me explicou sobre isso, e minha suposição no pior caso estava correta; porém, o funcionário também me disse que eu poderia levar um dia a mais do que o estipulado, contanto que isso fosse declarado na entrevista com apresentação do projeto.
- Este projeto foi desenvolvido em um ambiente Windows 10 Home, sem o uso de Docker ou WSL, portanto, se você containeirizar o projeto ou rodá-lo no WSL, por favor entre em contato comigo caso aconteça algum problema que te responderei em prontidão.
