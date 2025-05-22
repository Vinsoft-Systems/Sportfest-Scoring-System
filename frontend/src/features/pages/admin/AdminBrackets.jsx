import { SportBranchSelect } from '@/common/components/SportBranchSelect';
import { ApiProvider, NextGenDataGrid } from 'fastapi-rtk';

export default function AdminBrackets({ resource_name }) {
  return (
    <ApiProvider resource_name={resource_name}>
      <NextGenDataGrid
        form={{
          add: {
            sport_branch: {
              component: ({ componentProps }) => <SportBranchSelect componentProps={componentProps} type={'add'} />,
            },
          },
          edit: {
            sport_branch: {
              component: ({ componentProps }) => <SportBranchSelect componentProps={componentProps} type={'edit'} />,
            },
          },
        }}
      />
    </ApiProvider>
  );
}
