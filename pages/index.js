import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

function ProfileSidebar(props){
  
  return (
    <Box>
      <img src={`https://github.com/${props.gitHubUser}.png`} alt="userimage" style={{ borderRadius: '8px' }} /> 
    </Box>
  )
}

export default function Home() {
  const radomUser = 'carlos-evieira'
  const favoriteFriends = [
    'juunegreiros', 
    'omariosouto',  
    'peas', 
    'rafaballerini', 
    'marcobrunodev', 
    'felipefialho'
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar gitHubUser = {radomUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box >
            <h1 className="title">
              Bem vindo(a)
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>

        <div className="ProfileRelationsArea" style={{ gridArea: 'ProfileRelationsArea' }}>
          <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle">
              Pessoas da Comunidade ({favoriteFriends.length})
            </h2>

            <ul>
              {favoriteFriends.map((favoriteFriend) => {
                return( 
                  <li>
                    <a href={`/users/${favoriteFriend}`} key={favoriteFriend}>
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
