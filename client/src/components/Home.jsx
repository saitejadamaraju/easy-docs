import { useParams } from 'react-router-dom';
import TextEditor from './TextEditor';
import LogoutButton from './LogoutButton';

const Home = () =>{

    const {id:documentId} = useParams();

    return (
        <>
          
          <TextEditor documentId={documentId} />
        </>
    )

}

export default Home;