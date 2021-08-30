import React, { useState, useEffect } from "react";
import './App.css';



export  default function TituloFilmes() {
    // inicializa a declacao do estado do filme, juntamente com sua funcao de set (atualizacao) do estado.
    const [filmes, setFilmes] = useState([
      {
        id: 1,
        nome: "Capitão América",
        imagemUrl:
          "https://upload.wikimedia.org/wikipedia/pt/d/d8/Capit%C3%A3o_Am%C3%A9rica_O_Primeiro_Vingador_-_Poster.jpg",
      sinopse:"2ª Guerra Mundial. Steve Rogers (Chris Evans) é um jovem que aceitou ser voluntário em uma série de experiências que visam criar o supersoldado americano. Os militares conseguem transformá-lo em uma arma humana, mas logo percebem que o supersoldado é valioso demais para pôr em risco na luta contra os nazistas. Desta forma, Rogers é usado como uma celebridade do exército, marcando presença em paradas realizadas pela Europa no intuito de levantar a estima dos combatentes. Para tanto passa a usar uma vestimenta com as cores da bandeira dos Estados Unidos, azul, branca e vermelha. Só que um plano nazista faz com que Rogers entre em ação e assuma a alcunha de Capitão América, usando seus dons para combatê-los em plenas trincheiras da guerra.",
      },
      {
        id: 2,
        nome: "Capitã Marvel",
        imagemUrl:
          "https://upload.wikimedia.org/wikipedia/pt/5/59/Captain_Marvel_%282018%29.jpg",
          sinopse:"Em Capitã Marvel, Carol Danvers (Brie Larson) é uma ex-agente da Força Aérea norte-americana, que, sem se lembrar de sua vida na Terra, é recrutada pelos Kree para fazer parte de seu exército de elite. Inimiga declarada dos Skrull, ela acaba voltando ao seu planeta de origem para impedir uma invasão dos metaformos, e assim vai acabar descobrindo a verdade sobre si, com a ajuda do agente Nick Fury (Samuel L. Jackson) e da gata Goose."
      },
      {
        id: 3,
        nome: "Deadpool",
        imagemUrl:
          "https://br.web.img3.acsta.net/pictures/20/01/10/15/42/1604813.jpg",
          sinopse:"Ex-militar e mercenário, Wade Wilson (Ryan Reynolds) é diagnosticado com câncer em estado terminal, porém encontra uma possibilidade de cura em uma sinistra experiência científica. Recuperado, com poderes e um incomum senso de humor, ele torna-se Deadpool e busca vingança contra o homem que destruiu sua vida."
      },
      {
        id: 4,
        nome: "Homem de Ferro",
        imagemUrl:
          "https://istoe.com.br/wp-content/uploads/sites/14/istoeimagens/imagens/mi_3203745325108001.jpg",
          sinopse:"Tony Stark (Robert Downey Jr.) é um industrial bilionário, que também é um brilhante inventor. Ao ser sequestrado ele é obrigado por terroristas a construir uma arma devastadora mas, ao invés disto, constrói uma armadura de alta tecnologia que permite que fuja de seu cativeiro. A partir de então ele passa a usá-la para combater o crime, sob o alter-ego do Homem de Ferro."
      },
      {
        id: 5,
        nome: "Homem de Ferro 2",
        imagemUrl:
          "https://ratosdelocadora.files.wordpress.com/2010/05/homem-de-ferro-2-poster.jpg",
          sinopse:"Após confessar ao mundo ser o Homem de Ferro, Tony Stark (Robert Downey Jr.) passa a ser alvo do governo dos Estados Unidos, que deseja que ele entregue seu poderoso traje. Com a negativa, o governo passa a desenvolver um novo traje com o maior rival de Stark, Justin Hammer (Sam Rockwell). Jim Rhodes (Don Cheadle), o braço direito de Tony, é colocado no centro deste conflito, o que faz com que assuma a identidade de Máquina de Combate. Paralelamente, Ivan Vanko (Mickey Rourke) cria o alter-ego de Whiplash para se vingar dos atos da família Stark no passado. Para combater Whiplash e a perseguição do governo, Stark conta com o apoio de sua nova assistente, Natasha Romanoff (Scarlett Johansson), e de Nick Fury (Samuel L. Jackson), o diretor da S.H.I.E.L.D."
      },
      {
        id: 6,
        nome: "Homem Aranha no way home ",
        imagemUrl:
          "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b8320c110356853.6066eec3b3637.jpg",
        sinopse:"Em Homem-Aranha: Sem Volta para Casa, Peter Parker (Tom Holland) precisará lidar com as consequências da sua identidade como aracnídeo ter sido revelada pela reportagem do Clarim Diário. Incapaz de separar sua vida normal das aventuras de ser um super-herói, Parker pede ao Doutor Estranho (Benedict Cumberbatch) para que todos esqueçam sua verdeira identidade. Entretanto, o feitiço não sai como planejado e a situação torna-se ainda mais perigosa, forçando-o a descobrir o que realmente significa ser o Homem-Aranha."
      },
    ]);

    // inicializa a declacao do estado dos inputs juntamente com suas funcoes de set (atualizacao) do estado.
    const [nomeFilme, setNomeFilme] = useState("");
    const [imagemUrlFilme, setImagemUrlFilme] = useState("");
    const [sinopseFilme, setSinopseFilme] = useState("");
    const[editando, setEditando] = useState(false);
    const[indiceEditando,setindiceEditando] = useState(null);
    

    useEffect (()=>{
      if (indiceEditando !== null & editando) {
        setNomeFilme(filmes[indiceEditando].nome)
        setImagemUrlFilme(filmes[indiceEditando].imagemUrl)
        setSinopseFilme(filmes[indiceEditando].sinopse)
      }
  },[indiceEditando])


    const handleNameChange = (e) => {
      setNomeFilme(e.target.value);
    }

    const handleImgChange = (e) => {
      setImagemUrlFilme(e.target.value);
    }
    const handleSinopseChange = (e) => {
      setSinopseFilme(e.target.value);
    }

    const handleSubmit =(e) => {
      e.preventDefault();
      if(editando){
        const filmesAtualizados = filmes.map((filme,indice) =>{
          if(indiceEditando === indice){
            filme.nome = nomeFilme;
            filme.imagemUrl = imagemUrlFilme;
            filme.sinopse= sinopseFilme;
          }
          return filme
        });
        setFilmes(filmesAtualizados);
        setEditando(false);
        setindiceEditando(null);
      }else
      setFilmes ([
        ...filmes,
        {
          
         nome: nomeFilme,
         imagemUrl: imagemUrlFilme, 
         sinopseFilme:sinopseFilme,

        }
      ]);
      setNomeFilme('');
      setImagemUrlFilme('');
      setSinopseFilme('');
    }

    const handleDelete = (indice) =>{
      setFilmes (filmes.filter((filme,indiceFilme) => indice !== indiceFilme))
    };


    

    // método chamado no evento submit do formulario com o intuito de conter a regra para a adicao do filme
    // nesse caso usamos evento.prevent default para evitar o comportamento padrao do subimit
    // que seria recarregar a pagina quando clicar no botao e enviar o submit.
    
    return (
      // No input adicionamos um evento on change que é disparado a cada mudanca do formulario
      // ou seja para cada tecla que digitar no formulario envia a determinada funcao
      // no caso abaixo estamos pedindo para o on change chamar a funcao que atualiza o estado 'set'
      // e atribuir o valor do value do input no seu estado
      // já que o valor do value é o valor que o usuario digitou no input
      // precisamos atribuir a nossa variavel do estado no value para alem de refletir no input o que digitamos
      // atualizar tambem o valor do value no input.
      <div className="container">
        <div className="titulo">
          <h1> Filmes Marvel</h1>
        </div>
        <div ClassName="subtitulo">
          <h2>Cadastre um filme</h2>
        </div>
        <div className="Form">
          <form onSubmit={handleSubmit}>
            <input placeholder="Digite o nome do filme" 
            value={nomeFilme} 
            onChange={handleNameChange}
            type="text"/>
            <br/>
            <input placeholder="Digite a url da imagem" 
            value={imagemUrlFilme} 
            onChange={handleImgChange}
            type="text"/>
            <br/>
            <br/>
            <div className="Sinopse">
            <input placeholder="Sinopse do Filme"  
            value={sinopseFilme} 
            onChange={handleSinopseChange}
            type="text"/>
            </div>
            <br/>
            <button type="submit">Salvar</button>
          </form>
        </div>
        <div className="Lista-filme"> 
          <ul>
            {filmes.map((f,indice) => (
              <li key={f.id}>
                <h3>{f.nome}</h3>
                <img src={f.imagemUrl} alt={f.nome} />
                <p>{f.sinopse}</p>
                <button type='button' onClick={() => handleDelete(indice)} > Excluir </button>
                <button type='button' onClick={()=>{
                  setEditando(true);
                  setindiceEditando(indice);
                }}> Editar </button>
              </li>
            ))}
          </ul>
        </div>

      </div>
    )
}
