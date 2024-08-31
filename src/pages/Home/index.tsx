import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import globalStyles from '../../globals.module.css'
import styles from './styles.module.css'
import { useContext} from 'react'



const Home = () => {

  const {photoURL, displayName} = useContext(UserContext)
  
  return(
    <>
      <div className={styles.header}>
        <h1>Exemplo Auth</h1>
        <img src={photoURL} alt="Foto de Perfil" className={styles.photo}/>
        <p>Olá, {displayName}</p>
        <p><Link to='/logout'><u>Sair</u></Link></p>
      </div>
      <div className={styles.main}>
        <p>Exemplo de Autenticação com React</p>
      </div>
    </>
  )
}

export default Home