const projects = require('../models/projectModel')

// add project
exports.addProjectController = async (req, res) => {
    console.log("Inside addProject Controller");
    const userId = req.userId
    console.log(userId);
    const { title, language, overview, github, website } = req.body;
    const projectImg = req.file.filename
    console.log(title, language, overview, github, website, projectImg);
    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(406).json("Project already exist in our collection... Please upload another")
        } else {
            // to store project in mongodb
            // create a object for projectModel
            const newProject = new projects({
                title, language, overview, github, website, projectImg, userId
            })
            await newProject.save()
            res.status(200).json(newProject)
        }
    } catch (err) {
        res.status(401).json(err)
    }

}

// get home project - no nedd of authorisation
exports.homePageProjectController = async (req, res) => {
    console.log("Inside home page project controller");
    try {
        const allHomeProjects = await projects.find().limit(3)
        res.status(200).json(allHomeProjects)
    } catch (err) {
        res.status(401).json(err)
    }

}

// get all project - nedd of authorisation
exports.allProjectController = async (req, res) => {
    console.log("Inside page project controller");
    const searchKey = req.query.search
    console.log(searchKey);
    const query = {
        language: {
            $regex: searchKey, $options: 'i'
        }
    }
    try {
        const allProjects = await projects.find(query)

        res.status(200).json(allProjects)
    } catch (err) {
        res.status(401).json(err)
    }

}

// get user project - nedd of authorisation
exports.userProjectController = async (req, res) => {
    console.log("Inside user project controller");
    const userId = req.userId
    try {
        const alluserProject = await projects.find({ userId })
        res.status(200).json(alluserProject)
    } catch (err) {
        res.status(401).json(err)
    }
}