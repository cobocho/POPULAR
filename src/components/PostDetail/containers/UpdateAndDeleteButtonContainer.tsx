import UpdateAndDelete from '../components/UpdateAndDeleteButtons';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../Hooks/useSelectorHooks';
import { WritePostSliceActions, isUpdate } from '../../WritePost/WritePostSlice';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { Post } from '../../../types/post';
import { API_PATH } from '../../../constants/path';
import callApi from '../../../utils/callApi';
import { User } from '../../../types/user';

const getUserInfo = async (setUserData: React.Dispatch<React.SetStateAction<User | undefined>>) => {
  try {
    const response = await callApi('GET', API_PATH.AUTH.GET.PROFILE);
    if (response.ok) {
      const data = await response.json();
      setUserData(data);
      return;
    } else return;
  } catch (err: any) {
    throw new Error(err);
  }
};

const UpdateAndDeleteContainer = () => {
  const navigate: NavigateFunction = useNavigate();

  const [userData, setUserData] = useState<User>();
  const [postInfo, setPostInfo] = useState<Post>();
  useEffect(() => {
    getUserInfo(setUserData);
    getPostInfo();
  }, []);

  const dispatch = useAppDispatch();
  const setTab = (tab: string) => dispatch(WritePostSliceActions.setTab(tab));
  const setPostContent = (content: string) => {
    return dispatch(WritePostSliceActions.setPostContent(content));
  };
  const setPostTitle = (title: string) => {
    return dispatch(WritePostSliceActions.setPostTitle(title));
  };
  const setChoiceStoreId = (id: string) => {
    return dispatch(WritePostSliceActions.setChoiceStoreId(id));
  };
  const setIsUpdate = (isUpdate: isUpdate) => {
    return dispatch(WritePostSliceActions.setIsUpdate(isUpdate));
  };

  const postId = useParams().postId;

  const getPostInfo = async () => {
    const response = await fetch(API_PATH.POST.GET.BY_ID.replace(':postId', postId ? postId : ''));
    const result = await response.json();
    setPostInfo(result);
  };

  async function DeleteFetchData() {
    const response = await callApi('DELETE', API_PATH.POST.DELETE, { ids: [postId ? postId : ''] });
    const result = await response.json();
    alert(result.message);
    navigate('/community/board');
  }

  const isAuthor = postInfo && userData?._id === postInfo.author._id;

  const deletePost = () => {
    if (isAuthor) {
      DeleteFetchData();
    } else {
      alert('작성자가 아닙니다');
    }
  };

  const updatePost = () => {
    if (isAuthor) {
      const currTab =
        postInfo.board === 'free' ? '자유게시판' : postInfo.board === 'review' ? '후기게시판' : '모집게시판';

      setTab(currTab);
      setPostContent(postInfo.content);
      setPostTitle(postInfo.title);
      postInfo.store_id && setChoiceStoreId(postInfo.store_id._id);
      setIsUpdate({ use: true, id: postInfo._id });
      navigate('/community/write');
    } else {
      alert('작성자가 아닙니다');
    }
  };
  return isAuthor ? <UpdateAndDelete deletePost={deletePost} updatePost={updatePost}></UpdateAndDelete> : <div></div>;
};

export default UpdateAndDeleteContainer;
