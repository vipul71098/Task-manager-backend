const Project = require('../models/Project'); // Make sure to adjust the path
const User = require('../models/User');
// Create a new project
// exports.createProject = async (req, res) => {
//   try {
//     const { name, url, description, category } = req.body;
//     const project = new Project({
//       name,
//       url,
//       description,
//       category,
//     });Project
    
//     await project.save();
//     res.json(project);
//   } catch (error) {
//     res.status(500).json({ error: 'Project creation failed' });
//   }
// };

exports.createProject = async (req, res) => {
  const {
    name,
    url,
    description,
    category,
    createdAt,
    updatedAt,
    users
  } = req.body;

  try {
    // Create a new project
    const project = new Project({
      name,
      url,
      description,
      category,
      createdAt,
      updatedAt,
    });

    // Initialize arrays to store new users and update existing users
    const newUserIds = [];
    const updateUserIds = [];

    // Loop through the users in the request
    for (const user of users) {
      const existingUser = await User.findOne({ id: user.id });

      if (existingUser) {
        // User already exists, update projectId
        existingUser.projectId = project.id;
        await existingUser.save();
        updateUserIds.push(existingUser.id);
      } else {
        // User doesn't exist, create a new user
        console.log('no user exist')
      }
    }



    project.users = [...newUserIds, ...updateUserIds];

    await project.save();

    // Update the issues to associate them with the project
    const responseData = {
      project: {
        id: project.id,
        name: project.name,
        url: project.url,
        description: project.description,
        category: project.category,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
        users: newUserIds.concat(updateUserIds)
      },
    };

    res.status(201).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    const jsonData = {
      project: {
        id: 212215,
        name: 'Mission Impossible 1.0',
        url: '',
        description: 'Plan, track, and manage your agile and software development projects in PennPaper. Customize your workflow, collaborate, and release great software.',
        category: 'software',
        createdAt: '2023-10-10T16:45:23.141Z',
        updatedAt: '2023-10-10T16:45:23.141Z',
        users: [
          {
            id: 637383,
            name: 'Pickle Rick',
            email: 'rick@PennPaper.guest',
            avatarUrl: 'https://i.ibb.co/7JM1P2r/picke-rick.jpg',
            createdAt: '2023-10-10T16:45:23.137Z',
            updatedAt: '2023-10-10T16:45:23.141Z',
            projectId: 212215,
          },
          {
            id: 637382,
            name: 'Baby Yoda',
            email: 'yoda@PennPaper.guest',
            avatarUrl: 'https://i.ibb.co/6n0hLML/baby-yoda.jpg',
            createdAt: '2023-10-10T16:45:23.131Z',
            updatedAt: '2023-10-10T16:45:23.141Z',
            projectId: 212215,
          },
          {
            id: 637381,
            name: 'Lord Gaben',
            email: 'gaben@PennPaper.guest',
            avatarUrl: 'https://i.ibb.co/6RJ5hq6/gaben.jpg',
            createdAt: '2023-10-10T16:45:23.131Z',
            updatedAt: '2023-10-10T16:45:23.141Z',
            projectId: 212215,
          },
        ],
        issues: [
          {
            id: 1733510,
            title: 'Try dragging issues to different columns to transition their status.',
            type: 'story',
            status: 'selected',
            priority: '3',
            listPosition: 3,
            createdAt: '2023-10-10T16:45:23.148Z',
            updatedAt: '2023-10-10T17:37:52.731Z',
            userIds: [],
          },
          {
            id: 1733512,
            title: 'You can track how many hours were spent working on an issue, and how many hours remain.',
            type: 'task',
            status: 'inprogress',
            priority: '1',
            listPosition: 7,
            createdAt: '2023-10-10T16:45:23.172Z',
            updatedAt: '2023-10-10T16:45:23.172Z',
            userIds: [],
          },
          {
            id: 1733513,
            title: 'Each issue can be assigned priority from lowest to highest.',
            type: 'task',
            status: 'selected',
            priority: '5',
            listPosition: 5,
            createdAt: '2023-10-10T16:45:23.173Z',
            updatedAt: '2023-10-10T16:45:23.173Z',
            userIds: [],
          },
          {
            id: 1733514,
            title: 'Each issue has a single reporter but can have multiple assignees.',
            type: 'story',
            status: 'selected',
            priority: '4',
            listPosition: 6,
            createdAt: '2023-10-10T16:45:23.176Z',
            updatedAt: '2023-10-10T16:45:23.176Z',
            userIds: [637381, 637382],
          },
          {
            id: 1733515,
            title: 'Try leaving a comment on this issue.',
            type: 'task',
            status: 'done',
            priority: '3',
            listPosition: 7,
            createdAt: '2023-10-10T16:45:23.178Z',
            updatedAt: '2023-10-10T16:45:23.178Z',
            userIds: [637382],
          },
          {
            id: 1733516,
            title: 'You can use rich text with images in issue descriptions.',
            type: 'story',
            status: 'selected',
            priority: '1',
            listPosition: 2,
            createdAt: '2023-10-10T16:45:23.182Z',
            updatedAt: '2023-10-10T17:44:56.788Z',
            userIds: [637381],
          },
          {
            id: 1733511,
            title: 'This is an issue of type: Task.',
            type: 'task',
            status: 'inprogress',
            priority: '4',
            listPosition: 6,
            createdAt: '2023-10-10T16:45:23.150Z',
            updatedAt: '2023-10-10T16:47:29.960Z',
            userIds: [637383],
          },
          {
            id: 1733509,
            title: "Click on an issue to see what's behind it.",
            type: 'task',
            status: 'selected',
            priority: '2',
            listPosition: 4,
            createdAt: '2023-10-10T16:45:23.148Z',
            updatedAt: '2023-10-10T17:37:51.736Z',
            userIds: [637383],
          },
        ],
      },
    };
    
    // const responseData = {
    //   project: projects
    // };
    //console.log("project", responseData);
    res.json(jsonData);
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching projects' });
  }
};

// Get a project by ID
exports.getProjectById = async (req, res) => {
  const projectId = req.params.id;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching project' });
  }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
  const projectId = req.params.id;
  try {
    const updatedProject = await Project.findByIdAndUpdate(projectId, req.body, { new: true });
    if (!updatedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: 'Error while updating project' });
  }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
  const projectId = req.params.id;
  try {
    const deletedProject = await Project.findByIdAndRemove(projectId);
    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(deletedProject);
  } catch (error) {
    res.status(500).json({ error: 'Error while deleting project' });
  }
};
