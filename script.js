//campo
var canva=document.getElementById("canvas");
var container=canva.getContext("2d");
//jogadores (x,y,largura,altura)
var jogador1 ={
    x:80,
    y:300,
    largura:20,
    altura:120,
    dir:0
}
var jogador2 ={
    x:1200,
    y:300,
    largura:20,
    altura:120,
    dir:0
}
var bola={
    x:(1280/2)-15,
    y:(720/2)-15,
    largura:30,
    altura:30,
    dirx:8,
    diry:2
}
//set inicial
var jogando=true;
container.fillStyle="#8b8b8b";
container.font="50px arial";
container.fillText("clique no campo para comecar", 300, 100);
container.fillText("w move player 1 para cima ", 300, 200);
container.fillText("s move player 1 para baixo ", 300, 300);
container.fillText("↑ move player 2 para cima ", 300, 400);
container.fillText("↓ move player 2 para baixo ", 300, 500);

//movimentacao dos jogadores
function move_jogador(){
    //limites do campo
    if(jogador1.y<0){
        jogador1.y=0;
    }
    else if(jogador1.y>600){
        jogador1.y=600;
    }
    if(jogador2.y<0){
        jogador2.y=0;
    }
    else if(jogador2.y>600){
        jogador2.y=600;
    }
    //movimentacao dos jogadores
    jogador1.y+=jogador1.dir;
    jogador2.y+=jogador2.dir;
}
document.addEventListener("keydown",function(e){
    if(e.keyCode==87){//W
        jogador1.dir=-8;
    }
    else if(e.keyCode==83){//S
        jogador1.dir=8;
    }
    else if(e.keyCode==38){ //seta para cima
        jogador2.dir=-8;
    }
    else if(e.keyCode==40){//seta para baixo
        jogador2.dir =8;
    }
});
document.addEventListener("keyup",function(e){
    if(e.keyCode==87){//W
        jogador1.dir=0;
    }
    else if(e.keyCode==83){//S
        jogador1.dir=0;
    }
    else if(e.keyCode==38){ //seta para cima
        jogador2.dir=0;
    }
    else if(e.keyCode==40){//seta para baixo
        jogador2.dir =0;
    }
});
//cor dos jogadores e a bola
container.fillStyle="#8b8b8b";
//pontuacao
container.font="20px arial";
var pts1=0;
var pts2=0;
//funcao para desenhar os items na tela
function desenhar(){
    container.fillRect(jogador1.x,jogador1.y,jogador1.largura,jogador1.altura);
    container.fillRect(jogador2.x,jogador2.y,jogador2.largura,jogador2.altura);
    container.fillRect(bola.x,bola.y,bola.largura,bola.altura);
    container.fillText("Score 1: "+pts1, 200, 50);
    container.fillText("Score 2: "+pts2, 1000, 50);
}
//funcao para mover a bola
function move_ball(){bola.x+=bola.dirx; bola.y+=bola.diry;}
//colisao
function colisao_bola(){
    if (bola.y + bola.altura >= jogador2.y && bola.y <= jogador2.y + jogador2.altura  && bola.x >= jogador2.x - jogador2.largura) {
        bola.dirx *= -1;
    }
    else if (bola.y + bola.altura >= jogador1.y && bola.y <= jogador1.y + jogador1.altura  && bola.x <= jogador1.x + jogador1.largura) {
        bola.dirx *= -1;
    }
    if(bola.y>690){
        bola.diry*=(-1);
    }
    else if(bola.y<0){
        bola.diry*=(-1);
    }
}
//funcao para marcar os pontos
function pontos(){
    if(bola.x>1380){
        pts1++;
        bola.x=(1280/2)-15;
        bola.y=(720/2)-15;
        bola.dirx*=(-1);
    }
    else if(bola.x<-100){
        pts2++;
        bola.x=(1280/2)-15;
        bola.y=(720/2)-15;
        bola.dirx*=(-1);
    }
}
//gameover
function gameover(){
    if(pts1==5 ){
        alert("Jogador 1 venceu!");
        jogando=false;
    }else if(pts2==5){
        alert("Jogador 2 venceu!");
        jogando=false;
    }
}
//mostra resultado final
function desenharvitoria(){
    container.font="50px arial";
    container.fillText("Score 2: "+pts2, 1000, 300);
    container.fillText("Score 1: "+pts1, 200, 300);
    container.fillText("Score 2: "+pts2, 1000, 300);
    container.fillText("Pressione F5 para recomecar ",300, 600);
    
}
//funcao para principal
function main(){
    if(jogando==true){//se jogando for true, o jogo continua
        container.clearRect(0,0,1280,720);
        desenhar();
        pontos();
        colisao_bola();
        move_jogador();
        move_ball();
        gameover();
    }
    else{
        container.clearRect(0,0,1280,720);
        desenharvitoria();
    }
}
function game(){ 
    setInterval(main,1000/60);
}
