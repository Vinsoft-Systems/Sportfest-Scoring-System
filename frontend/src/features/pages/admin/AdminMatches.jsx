import { SportBranchSelect } from '@/common/components/SportBranchSelect';
import { JsonFormsTagsInput } from '@/common/components/TagsInput';
import { TeamFinder } from '@/common/components/TeamFinder';
import { ApiProvider, NextGenDataGrid } from 'fastapi-rtk';

export default function AdminMatches({ resource_name }) {
  return (
    <ApiProvider resource_name={resource_name}>
      <NextGenDataGrid
        form={{
          add: {
            sport_branch: {
              component: ({ componentProps }) => <SportBranchSelect componentProps={componentProps} type={'add'} />,
            },
            team_a: {
              component: ({ componentProps }) => <TeamFinder componentProps={componentProps} type={'add'} />,
            },
            team_b: {
              component: ({ componentProps }) => <TeamFinder componentProps={componentProps} type={'add'} />,
            },
            score_list: {
              component: ({ componentProps }) => <JsonFormsTagsInput {...componentProps}></JsonFormsTagsInput>,
            },
          },
          edit: {
            sport_branch: {
              component: ({ componentProps }) => <SportBranchSelect componentProps={componentProps} type={'edit'} />,
            },
            team_a: {
              component: ({ componentProps }) => <TeamFinder componentProps={componentProps} type={'edit'} />,
            },
            team_b: {
              component: ({ componentProps }) => <TeamFinder componentProps={componentProps} type={'edit'} />,
            },
            score_list: {
              component: ({ componentProps }) => <JsonFormsTagsInput {...componentProps}></JsonFormsTagsInput>,
            },
          },
        }}
      />
    </ApiProvider>
  );
}
