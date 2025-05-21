import { ApiProvider, NextGenDataGrid } from 'fastapi-rtk';
import { SportBranchSelect } from '@/common/components/SportBranchSelect.jsx';

export default function AdminGroups({ resource_name }) {
  return (
    <ApiProvider resource_name={resource_name}>
      <NextGenDataGrid
        form={{
          add: {
            sport_branch: {
              component: ({ componentProps }) => <SportBranchSelect componentProps={componentProps} type={'add'} />,
            },
          },
        }}
      />
    </ApiProvider>
  );
}
