import { useContext, useState } from 'react'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider, FacebookAuthProvider  } from 'firebase/auth'
import { UserContext } from '../../context/UserContext'
import globalStyles from '../../globals.module.css'
import styles from './styles.module.css'
import { auth } from '../../config/firebase'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import google from '../../assets/img/google.png'
import github from '../../assets/img/github.png'
import facebook from '../../assets/img/facebook.png'

let photo: string|null = ''

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorMessage, shouldShowErrorMessage] = useState(false)

  const {setExp, setAuthTime, isSessionValid, setPhotoURL, setDisplayName} = useContext(UserContext)

  const navigate = useNavigate()


  if(isSessionValid()){
    navigate('/home')
  }

  const singInWithGitHub = async () => {
    const provider = new GithubAuthProvider();
      try{
        const result = await signInWithPopup(auth, provider)
        // const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential?.accessToken
        const user = result.user
        const {email, photoURL, displayName} = user
        setPhotoURL(photoURL || '')
        setDisplayName(displayName || '')
        console.log(email, photoURL, displayName)

        const token = await auth.currentUser?.getIdToken()
        // console.log(token)
        if(token){
          const decodedToken = jwtDecode(token)
          const {exp} = decodedToken
          setExp(exp || 0)
          navigate('/home')
        }
      } catch (err) {
        console.log(err)
      }
    }

    const singInWithFacebook = async () => {
      const provider = new FacebookAuthProvider();
        try{
          const result = await signInWithPopup(auth, provider)
          // const credential = GithubAuthProvider.credentialFromResult(result);
          // const token = credential?.accessToken
          const user = result.user
          const {email, photoURL, displayName} = user
          setPhotoURL(photoURL || '')
          setDisplayName(displayName || '')
          console.log(email, photoURL, displayName)
  
          const token = await auth.currentUser?.getIdToken()
          // console.log(token)
          if(token){
            const decodedToken = jwtDecode(token)
            const {exp} = decodedToken
            setExp(exp || 0)
            navigate('/home')
          }
        } catch (err) {
          console.log(err)
        }
      }


  const singInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try{
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const {email, photoURL, displayName} = user
      console.log(email, photoURL, displayName)
      // const userCredential = GoogleAuthProvider.credentialFromResult(result)

      const token = await auth.currentUser?.getIdToken()
      console.log(token)
      if(token){
        const decodedToken = jwtDecode(token)
        const {exp} = decodedToken
        setExp(exp || 0)
        navigate('/home')
      }
    } catch (err) {
      console.log(err)
    }
  }


  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    shouldShowErrorMessage(false)
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, email, password
      )

      const {user} = userCredential
      const token = await user.getIdToken()
      const decodedToken = jwtDecode(token)
      const {exp} = decodedToken
      setExp(exp || 0)
      setAuthTime(0)
      navigate('/home')
    } catch(err: any) {
      // auth/wrong-password
      // auth/user-not-found
      //const { code } = err
      console.log(err)
      shouldShowErrorMessage(true)
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles.loginArea}>
        <form className={globalStyles.loginForm} onSubmit={(e) => signIn(e)}>
          <input type="email" value={email} placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} required/>

          <input type="password" value={password} placeholder='Senha' onChange={(e) => setPassword(e.target.value)} required/>

          <input type="submit" value='Entrar' />
        </form>

        <p className={styles.redirect}>Não tem conta ainda? Clique <Link to='/create-user'>aqui</Link> para criar.</p>
      </div>

      <div className={globalStyles.messagesArea}>
        {showErrorMessage && (<h3 className={globalStyles.errorCard}>
          Credenciais Inválidas
        </h3>)}
      </div>

      <button className={styles.card} onClick={() => singInWithGoogle()}>
        <img src={google} alt="Google" />
        <span>Entrar com Google</span>
      </button>

      <button className={styles.card} onClick={() => singInWithGitHub()}>
        <img src={github} alt="GitHub" />
        <span>Entrar com GitHub</span>
      </button>

      <button className={styles.card} onClick={() => singInWithFacebook()}>
        <img src={facebook} alt="Facebook" />
        <span>Entrar com Facebook</span>
      </button>

    </div>
  )
}

export default Login