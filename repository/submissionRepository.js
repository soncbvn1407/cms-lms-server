const constants = require("../utils/constants");
const {
    addData,
    deleteData,
    updateData,
    fetchAllData,
    db,
    fetchDataById,
    snapshotToArray,
} = require("./firebaseRepository");

module.exports = class SubmissionRepository {
    async fetchSubmissions() {
        return await fetchAllData(constants.SUBMISSIONS_TABLE);
    }

    async fetchSubmissionByTermAndProgrammeAndDepartmentAndGroup(
        term,
        programme,
        department,
        group
    ) {
        let snapshot = await db
            .collection(constants.SUBMISSIONS_TABLE)
            .where("group", "==", group)
            .get();

        if (snapshot.empty) {
            throw "No matching documents";
        }

        return snapshotToArray(snapshot);
    }

    async fetchSubmissionByCourseIdAndUserAndAssignmentId(group, user, asm) {
        let snapshots = await db
            .collection(constants.SUBMISSIONS_TABLE)
            .where("course_id", "==", group)
            .where("user_id", "==", user)
            .where("assignment_id", "==", asm)
            .get();

        let data = snapshotToArray(snapshots)
        return data[0]
    }

    async fetchAssignmentsByCourseIdAndAssignmentId(course_id, assignment_id) {
        let snapshots = await db
            .collection(constants.SUBMISSIONS_TABLE)
            .where("course_id", "==", course_id)
            .where("assignment_id", "==", assignment_id)
            .get();
        return snapshotToArray(snapshots);
    }

    async fetchSubmissionById(id) {
        return await fetchDataById(constants.SUBMISSIONS_TABLE, id);
    }

    async fetchSubmissionByAssignmentId(id) {
        let data = await db
            .collection(constants.SUBMISSIONS_TABLE)
            .where("assignment_id", "==", id)
            .get();
        return snapshotToArray(data);
    }

    async fetchSubmissionByCourseId(id) {
        let data = await db
            .collection(constants.SUBMISSIONS_TABLE)
            .where("course_id", "==", id)
            .get();
        return snapshotToArray(data);
    }

    async submitSubmission(document) {
        return await addData(constants.SUBMISSIONS_TABLE, document);
    }

    async updateSubmission(id, document) {
        return await updateData(constants.SUBMISSIONS_TABLE, id, document);
    }

    async deleteSubmission(id) {
        return await updateData(constants.SUBMISSIONS_TABLE, id, {
            status: false,
        });
    }

    async deleteHardSubmission(id) {
        return await deleteData(constants.SUBMISSIONS_TABLE, id);
    }

    async uploadSubmission(course, submissionFile) { }
};
