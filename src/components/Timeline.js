import React, { Component } from "react";

class Timeline extends Component {
  render() {
    return (
      <div>
        <div class="card mb-4">
          <div class="card-body">
            <p>Type your note, and hit enter to add it</p>

            <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp"
                  alt="avatar"
                  width="25"
                  height="25"
                />
                <p class="small mb-0 ms-2">Martha</p>
              </div>
              <div class="d-flex flex-row align-items-center">
                <p class="small text-muted mb-0">Upvote?</p>
                <i class="far fa-thumbs-up mx-2 fa-xs text-body two"></i>
                <p class="small text-muted mb-0">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
