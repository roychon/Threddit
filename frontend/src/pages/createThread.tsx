import { useContext, useState } from 'react';
import Button from '../components/Button';
import { createThread } from '../helpers/backendCommicators';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const CreateThread = () => {
  // const params = useParams()
  const navigate = useNavigate();
  const buttonTitle = 'Create Thread';
  const auth = useContext(AuthContext);
  const handleClick = async () => {
    const response = await createThread(title, description, auth!.user!._id);
    navigate('/');
    console.log(response);
  };
  const [title, setTitle] = useState<String>('');
  const [description, setDescription] = useState<String>('');

  return (
    // TODO: fetch thread-name from url and output that in h3
    <section className='flexCol border-radius-10px' id='create-form'>
      <h2 style={{ fontWeight: 'bold' }}>{'Create thread'}</h2>
      <div className='flexCol' id='create-form-inputs' style={{ gap: '30px' }}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          id='create-form-title-input'
          placeholder='Title'
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          id='create-form-description-input'
          placeholder='description'
        ></textarea>
      </div>
      <Button
        id='create-post-btn'
        handleClick={handleClick}
        text={buttonTitle}
      />
    </section>
  );
};

export default CreateThread;
