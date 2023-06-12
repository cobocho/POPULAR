import styled from 'styled-components';

const Button = styled.button<{ update: boolean }>`
  color: var(--color-white);
  border-radius: 8px;
  width: 50px;
  height: 30px;
  font-size: var(--font-small);
  background-color: ${(props) => (props.update ? 'var(--color-main)' : 'var(--color-gray)')};
  margin: 5px;
  cursor: pointer;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UpdateAndDelete = ({ deletePost, updatePost }: { deletePost: () => void; updatePost: () => void }) => {
  return (
    <ButtonWrap>
      <Button update={true} onClick={updatePost}>
        글 수정
      </Button>
      <Button update={false} onClick={deletePost}>
        글 삭제
      </Button>
    </ButtonWrap>
  );
};

export default UpdateAndDelete;
