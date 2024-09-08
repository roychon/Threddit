import axios from './axios';

const createPost = async (
  title: String,
  description: String,
  threadID: String
) => {
  try {
    await axios.post('/post', {
      title,
      description,
      threadID,
    });
  } catch (e) {
    console.log('Error: ', e); // TODO: handle errors later
  }
};

const createThread = async (
  title: String,
  description: String,
  userID: any
) => {
  try {
    await axios.post('/thread', {
      title,
      description,
      userID,
    });
    console.log('thread created');
  } catch (e) {
    console.log('Error: ', e);
  }
};

const checkAuthStatus = async () => {
  const status = await axios.get('/auth-status');
  return status;
};

const changeUsername = async (newUsername: String, userID: any) => {
  try {
    const status = await axios.put('/user/username', {
      newUsername,
      userID,
    });
    return status;
  } catch (e) {
    console.log('Error: ', e);
  }
};

const joinThread = async (userID: any, threadID: any) => {
  try {
    const data = await axios.post('/thread/join', {
      userID,
      threadID,
    });
    console.log(data);
  } catch (e) {
    console.log('Error: ', e);
  }
};

const leaveThread = async (userID: string, threadID: string) => {
  try {
    const response = await axios.post('/thread/leave', {
      userID,
      threadID,
    });
    console.log(response.data);
  } catch (e) {
    console.error('Error: ', e);
  }
};

const checkMembership = async (
  userID: string,
  threadID: string
): Promise<boolean> => {
  try {
    const response = await axios.get('/thread/membership', {
      params: {
        userID,
        threadID,
      },
    });
    return response.data.isMember; // Adjust based on your API response
  } catch (e) {
    console.error('Error: ', e);
    return false;
  }
};

export {
  createPost,
  createThread,
  checkAuthStatus,
  changeUsername,
  joinThread,
  leaveThread,
  checkMembership,
};
