import { JsonFormsTagsInput } from '@/common/components/TagsInput';
import { ApiProvider, NextGenDataGrid } from 'fastapi-rtk';

export default function AdminCompetitions({ resource_name }) {
  return (
    <ApiProvider resource_name={resource_name}>
      <NextGenDataGrid
        form={{
          add: {
            sport_branches: {
              component: ({ componentProps }) => <JsonFormsTagsInput {...componentProps}></JsonFormsTagsInput>,
            },
          },
          edit: {
            sport_branches: {
              component: ({ componentProps }) => <JsonFormsTagsInput {...componentProps}></JsonFormsTagsInput>,
            },
          },
        }}
      />
    </ApiProvider>
  );
}
