/**
 * 
 * @param {*} user_id 
 * @param {*} post_ids 
 * @returns Posts[]
 * 
 * This function returns posts by replacing Results from Posts with data from other tables through the Loop
 *  DB.query() has been used to mimick Database Query execution and provides result from Database
 *  DB.query().first() has been used to mimick query execution and results 1 result from Database.
 */
function get_posts(user_id, post_ids) {
    let get_posts = "SELECT * FROM post WHERE `id` IN(" + post_ids + ")";
    let posts = DB.query(get_posts); 

    for (let post of posts) {
        let get_user = "SELECT id,username, full_name, profile_picture FROM users WHERE `id` =" + post.user + ' LIMIT 1';
        let user = DB.query(get_user).first();
        post.user = user;

        let get_followed = "SELECT COUNT(*) FROM follow WHERE `following_id` =" + post.user.id + " AND `follower_id`=" + user_id + " LIMIT 1";
        let followed = DB.query(get_followed).first()
        post.user.followed = followed === null ? false : true;


        let get_liked = "SELECT COUNT(*) FROM like WHERE `post_id`=".post.id + " LIMIT 1";
        let liked = DB.query(get_liked).first()
        post.liked = liked === null ? false : true;
    }


    return mapInputWithDBResult(post_ids, posts);


}

/**
 * 
 * @param {*} post_ids 
 * @param {*} posts_from_db 
 * @returns Posts
 * 
 * This function replaces post_ids with data fetched in the Database Array. 
 * It replaces results not found with NULL
 */
function mapInputWithDBResult(post_ids, posts_from_db) {
    let posts = [];
    for (let id of post_ids) {
        let temp = id;
        id = null;
        for (let post of posts_from_db) {
            if (post.id === temp) {
                id = post;
                break;
            }
        }
    }
    posts = [...post_ids];
    return posts; //
}


