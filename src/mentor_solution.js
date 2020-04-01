import { $ } from "./utils"
import { Users } from "./db/users"

export class MentorSolutionView {
  async render() {
    let profileLink = document.querySelector("#mentor-solution-page .track-header .byline a")
    if (!profileLink) return;

    let userid = profileLink.innerHTML
    let user = await Users.get(userid)
    Users.persist(user)
    let sidebar = user.sidebar

    if (sidebar.querySelector(".badge.mentor")) {
      sidebar.querySelector(".name").classList.add("mentor")
    }
    sidebar.querySelectorAll(".badge").forEach((badge) =>
      badge.innerHTML = badge.innerHTML.replace("mentor",""))

    let discussion = document.querySelector(".discussion") || document.querySelector(".claimed-section")
    discussion.insertAdjacentElement("beforebegin", sidebar)
    if (discussion.classList.contains("discussion")) {
      discussion.querySelector("h3").innerHTML="Discussion"
      sidebar.insertAdjacentElement("afterbegin",$("<h4>Who you're mentoring</h4>"))
    } else {
      sidebar.insertAdjacentElement("afterbegin",$("<h4>Who you'll be mentoring</h4>"))
    }
  }
}