import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

function ProfileSidebar(props){
  
  
  return (
    <Box as= "aside">
      <img src={`https://github.com/${props.gitHubUser}.png`} alt="userimage" style={{ borderRadius: '8px' }} /> 
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.gitHubUser}`} >
          @{props.gitHubUser}
        </a>
      </p> 
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  
  return (
    <ProfileRelationsBoxWrapper >
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
        
      </h2>
      <ul>
          {props.items.slice(0, 6).map((items) => {
            return( 
              <li key={items.id}>
              <a href={`https://avatars.githubusercontent.com/u/${items.avatar_url}.png`} >
                <img src={items.avatar_url} alt="Amigos" />
                <span>{items.login}</span>
              </a>
            </li>
            )
          })}  
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const radomUser = 'carlos-evieira'
  const [communities, setCommunities] =  React.useState([])
    // id: '56468987687',
    // title: 'Eu odeio acordar cedo',
    // image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  
  const favoriteFriends = [
    'juunegreiros', 
    'omariosouto',  
    'peas', 
    'rafaballerini', 
    'marcobrunodev', 
    'felipefialho'
  ]


  const [followers, setFollowers] = React.useState([])
  
  // 0- pegar o array de dados do GitHub  
  // GET
  React.useEffect(function(){
    fetch('https://api.github.com/users/carlos-evieira/followers')
    .then(function (respostaDoServidor){
      if(respostaDoServidor.ok){
        return respostaDoServidor.json()
      }
      throw new Error("opa, aconteceu algum problema", respostaDoServidor.status)
    })
    .then(function(respostaCompleta){
    setFollowers(respostaCompleta)
    })
    .catch (function(erro){
      console.error(erro)
    }) 
// API GraphQL
  // POST
  fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Authorization': '587410b936c60de678919129321d22',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query: ` query {
        allCommunities {
          title
          id
          imageUrl
          creatorSlug
        }
      } `}),
  })
  .then((response) => response.json()) // Pega o retorno do response.json e já retorna
  .then ((respostaCompleta) => {
    const communitiesFromDato = respostaCompleta.data.allCommunities
    console.log(communitiesFromDato)
    setCommunities(communitiesFromDato)
  } )

  }, [])

  return (
    <>
      <AlurakutMenu />
      <MainGrid >
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar gitHubUser = {radomUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box >
            <h1 className="title">
              Bem vindo @{radomUser}
            </h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateCommunity(e) {
              e.preventDefault()
              const dadosDoForm = new FormData(e.target) 

              console.log('Campo: ', dadosDoForm.get('title'))
              console.log('Campo: ', dadosDoForm.get('image'))

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: radomUser,
              }

              fetch('/api/comunidades', {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(comunidade)
              })
              .then(async(res) => {
                const dados = await res.json();
                console.log(dados.newRegister)
                const comunidade = dados.newRegister
                const totalCommunities = [...communities, comunidade]
                setCommunities(totalCommunities)
              })

            } }>
              <input type="text" 
              placeholder="Qual vai ser o nome da sua comunidade?" 
              name="title" 
              aria-label= "Qual vai ser o nome da sua comunidade?" 
              />
              <input type="text" 
              placeholder="Coloque uma URL para usarmos de capa" 
              name="image" 
              aria-label= "Coloque uma URL para usarmos de capa" 
              />
              <button>
                Criar comunidade
              </button>
             </form>
          </Box>
        </div>

        <div className="ProfileRelationsArea" style={{ gridArea: 'ProfileRelationsArea' }}>
        <ProfileRelationsBox title="Seguidores" items={followers} />
        <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>

            <ul>
              {communities.map((community) => {
                return( 
                  <li key={community.id}>
                    <a href={`/communities/${community.id}`} >
                      {/* <img src={`https://github.com/${community}.png` } alt="Amigos" /> */}
                      <img src={community.imageUrl} alt="Amigos" />
                      <span>{ community.title}</span>
                    </a>
                  </li>
                  )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle">
              Pessoas da Comunidade ({favoriteFriends.length})
            </h2>

            <ul>
              {favoriteFriends.map((favoriteFriend) => {
                return( 
                  <li key={favoriteFriend}>
                    <a href={`/users/${favoriteFriend}`} >
                      <img src={`https://github.com/${favoriteFriend}.png` } alt="Amigos" />
                      <span>{ favoriteFriend}</span>
                    </a>
                  </li>
                  )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

         
        </div>
      </MainGrid>
    </>
  )
}
