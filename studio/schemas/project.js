export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'video',
      title: 'Project Video',
      type: 'file',
      description: 'Optional video file upload (e.g., .mp4, .mov)',
      options: {
        accept: 'video/*'
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Detailed description for project detail page',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image' }],
      description: 'Additional images for the project gallery'
    },
    {
      name: 'liveUrl',
      title: 'Live URL',
      type: 'url',
      description: 'Link to the live project'
    },
    {
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
      description: 'Link to the project repository'
    },
    {
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Technologies used in this project'
    },
    {
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key features or highlights'
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [],
      description: 'Tags for filtering and search'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Client Work', value: 'Client Work' },
          { title: 'Frontend', value: 'Frontend' },
          { title: 'Fullstack', value: 'Fullstack' },
          { title: 'Personal', value: 'Personal' }
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'duration',
      title: 'Project Duration',
      type: 'string',
      description: 'How long the project took (e.g., "6 weeks", "3 months")'
    },
    {
      name: 'role',
      title: 'Your Role',
      type: 'string',
      description: 'Your role in this project (e.g., "Full-stack Developer", "Frontend Developer")'
    },
    {
      name: 'client',
      title: 'Client/Company',
      type: 'string',
      description: 'Client name or company (use "Personal Project" if none)'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image'
    }
  }
}