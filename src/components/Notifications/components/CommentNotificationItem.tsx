import styled from 'styled-components';
import { Comment } from '../../../types/comment';
import BoardTypeTag from '../../common/Board/BoardTypeTag';
import CommentIconMini from '../../common/Icons/CommentIconMini';

interface Props {
  commentData: Comment;
  board: string;
}
const CommentNotificationItem = ({ commentData, board }: Props) => {
  return (
    <Container>
      <CommentIconMini />
      <Content>
        <Message>{commentData.author.nickname}님이 댓글을 작성했습니다.</Message>
        <CommentContainer>
          <BoardTypeTag boardType={board} />
          <CommentContent>{commentData.content}</CommentContent>
        </CommentContainer>
      </Content>
    </Container>
  );
};

export default CommentNotificationItem;

const Container = styled.div`
  width: 95%;
  height: 80px;
  padding: 0 20px;
  margin: 8px auto;
  border: 1px solid var(--color-light-gray);

  transition: all 0.3s ease 0s;
  box-shadow: rgb(238, 238, 238) 1px 1px 10px;
  border-radius: 8px;

  display: flex;
  align-items: center;
`;

const Content = styled.div`
  margin: 0 18px;
  flex: 1;
`;

const Message = styled.p`
  margin-bottom: 4px;
`;

const CommentContainer = styled.div`
  display: flex;
  margin: 10px 0 0;
`;

const CommentContent = styled.p`
  font-size: var(--font-regular);
  margin-left: 10px;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
