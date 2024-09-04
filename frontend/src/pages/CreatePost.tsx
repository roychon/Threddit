import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import '../styles/post.css';
import axios from '../helpers/axios';
import { createPost } from '../helpers/backendCommicators';

const CreatePost = () => {
  const { threadID } = useParams();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [threadName, setThreadName] = useState<string>('');

  const handleClick = async () => {
    await createPost(title, description, threadID!);
    console.log('successfully created post');
    setTitle('');
    setDescription('');
  };

  useEffect(() => {
    const getThreadName = async () => {
      const data = await axios.get(`/thread/name/${threadID!}`);
      setThreadName(data.data.threadName);
    };
    getThreadName();
  }, [threadID]);

  return (
    <section className='flexCol border-radius-10px' id='create-form'>
      <h2 style={{ fontWeight: 'bold' }}>{`Create Post in ${threadName}`}</h2>
      <div className='flexCol' id='create-form-inputs' style={{ gap: '30px' }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          id='create-form-title-input'
          placeholder='Title'
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id='create-form-description-input'
          placeholder='description'
        ></textarea>
      </div>
      <Button
        id='create-post-btn'
        handleClick={handleClick}
        text={'Create Post'}
      />
    </section>
  );
};

export default CreatePost;
