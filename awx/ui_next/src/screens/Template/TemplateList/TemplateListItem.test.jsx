import React from 'react';

import { mountWithContexts } from '@testUtils/enzymeHelpers';
import { createMemoryHistory } from 'history';
import TemplateListItem from './TemplateListItem';

describe('<TemplateListItem />', () => {
  test('launch button shown to users with start capabilities', () => {
    const wrapper = mountWithContexts(
      <TemplateListItem
        isSelected={false}
        template={{
          id: 1,
          name: 'Template 1',
          url: '/templates/job_template/1',
          type: 'job_template',
          summary_fields: {
            user_capabilities: {
              start: true,
            },
          },
        }}
      />
    );
    expect(wrapper.find('LaunchButton').exists()).toBeTruthy();
  });
  test('launch button hidden from users without start capabilities', () => {
    const wrapper = mountWithContexts(
      <TemplateListItem
        isSelected={false}
        template={{
          id: 1,
          name: 'Template 1',
          url: '/templates/job_template/1',
          type: 'job_template',
          summary_fields: {
            user_capabilities: {
              start: false,
            },
          },
        }}
      />
    );
    expect(wrapper.find('LaunchButton').exists()).toBeFalsy();
  });
  test('edit button shown to users with edit capabilities', () => {
    const wrapper = mountWithContexts(
      <TemplateListItem
        isSelected={false}
        template={{
          id: 1,
          name: 'Template 1',
          url: '/templates/job_template/1',
          type: 'job_template',
          summary_fields: {
            user_capabilities: {
              edit: true,
            },
          },
        }}
      />
    );
    expect(wrapper.find('PencilAltIcon').exists()).toBeTruthy();
  });
  test('edit button hidden from users without edit capabilities', () => {
    const wrapper = mountWithContexts(
      <TemplateListItem
        isSelected={false}
        template={{
          id: 1,
          name: 'Template 1',
          url: '/templates/job_template/1',
          type: 'job_template',
          summary_fields: {
            user_capabilities: {
              edit: false,
            },
          },
        }}
      />
    );
    expect(wrapper.find('PencilAltIcon').exists()).toBeFalsy();
  });
  test('missing resource icon is shown.', () => {
    const wrapper = mountWithContexts(
      <TemplateListItem
        isSelected={false}
        template={{
          id: 1,
          name: 'Template 1',
          url: '/templates/job_template/1',
          type: 'job_template',
          summary_fields: {
            user_capabilities: {
              edit: false,
            },
          },
        }}
      />
    );
    expect(wrapper.find('ExclamationTriangleIcon').exists()).toBe(true);
  });
  test('missing resource icon is not shown when there is a project and an inventory.', () => {
    const wrapper = mountWithContexts(
      <TemplateListItem
        isSelected={false}
        template={{
          id: 1,
          name: 'Template 1',
          url: '/templates/job_template/1',
          type: 'job_template',
          summary_fields: {
            user_capabilities: {
              edit: false,
            },
            project: { name: 'Foo', id: 2 },
            inventory: { name: 'Bar', id: 2 },
          },
        }}
      />
    );
    expect(wrapper.find('ExclamationTriangleIcon').exists()).toBe(false);
  });
  test('missing resource icon is not shown when inventory is prompt_on_launch, and a project', () => {
    const wrapper = mountWithContexts(
      <TemplateListItem
        isSelected={false}
        template={{
          id: 1,
          name: 'Template 1',
          url: '/templates/job_template/1',
          type: 'job_template',
          ask_inventory_on_launch: true,
          summary_fields: {
            user_capabilities: {
              edit: false,
            },
            project: { name: 'Foo', id: 2 },
          },
        }}
      />
    );
    expect(wrapper.find('ExclamationTriangleIcon').exists()).toBe(false);
  });
  test('missing resource icon is not shown type is workflow_job_template', () => {
    const wrapper = mountWithContexts(
      <TemplateListItem
        isSelected={false}
        template={{
          id: 1,
          name: 'Template 1',
          url: '/templates/job_template/1',
          type: 'workflow_job_template',
          summary_fields: {
            user_capabilities: {
              edit: false,
            },
          },
        }}
      />
    );
    expect(wrapper.find('ExclamationTriangleIcon').exists()).toBe(false);
  });
  test('clicking on template from templates list navigates properly', () => {
    const history = createMemoryHistory({
      initialEntries: ['/templates'],
    });
    const wrapper = mountWithContexts(
      <TemplateListItem
        isSelected={false}
        detailUrl="/templates/job_template/1/details"
        template={{
          id: 1,
          name: 'Template 1',
          summary_fields: {
            user_capabilities: {
              edit: false,
            },
          },
        }}
      />,
      { context: { router: { history } } }
    );
    wrapper.find('Link').simulate('click', { button: 0 });
    expect(history.location.pathname).toEqual(
      '/templates/job_template/1/details'
    );
  });
});
