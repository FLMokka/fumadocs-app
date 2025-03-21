import { TypeTable } from 'fumadocs-ui/components/type-table';

export function ObjectTable() {
  return (
    <TypeTable
      type={{
        code: {
          description:
            'Write the code inside ` ` to handle line breaks and indentation.',
          type: 'string',
          default: "",
          required: true,
        },
        title: {
          description:
            'Optional title for the code block. When provided, shows a collapsible header.',
          type: 'string',
          default: "undefined",
          required: false,
        },
        language: {
          description:
            'Programming language for syntax highlighting.',
          type: 'string',
          default: "tsx",
          required: false,
        },
        defaultOpen: {
          description:
            'Whether the code block should be expanded by default when a title is present.',
          type: 'boolean',
          default: "false",
          required: false,
        },
        colorScheme: {
          description:
            'Theme for syntax highlighting.',
          type: '"light" | "dark"',
          default: "light",
          required: false,
        },
        className: {
          description:
            'Additional CSS classes to apply to the component.',
          type: 'string',
          default: "undefined",
          required: false,
        },
      }}
    />
  )
}