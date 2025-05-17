import { SportBranchSelect } from '@/common/components/SportBranchSelect';
import { JsonFormsTagsInput } from '@/common/components/TagsInput';
import { ApiProvider, NextGenDataGrid } from 'fastapi-rtk';

export default function AdminTeams({ resource_name }) {
  return (
    <ApiProvider resource_name={resource_name}>
      <NextGenDataGrid
        form={{
          add: {
            sport_branch: {
              component: ({ componentProps }) => <SportBranchSelect componentProps={componentProps} type={'add'} />,
            },
            players: {
              component: ({ componentProps }) => <JsonFormsTagsInput {...componentProps}></JsonFormsTagsInput>,
            },
            profile_picture: {
              type: 'file',
              accept: 'image/*',
            }
          },
          edit: {
            sport_branch: {
              component: ({ componentProps }) => <SportBranchSelect componentProps={componentProps} type={'edit'} />,
            },
            players: {
              component: ({ componentProps }) => <JsonFormsTagsInput {...componentProps}></JsonFormsTagsInput>,
            },
            profile_picture: {
              type: 'file',
              accept: 'image/*',
            }
          },
        }}
      />
    </ApiProvider>
  );
}
