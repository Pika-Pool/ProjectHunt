import type { GetStaticProps, NextPage } from 'next';

const EditProjectWithoutProjectId: NextPage = () => <></>;
export default EditProjectWithoutProjectId;

export const getStaticProps: GetStaticProps = () => {
	return { notFound: true };
};
