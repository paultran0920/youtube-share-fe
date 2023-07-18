import { render, screen } from "@testing-library/react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { AppContext } from "../../../context/app-context";
import { VideoInfoDto } from "../../../models/youtebe-models";
import { VideoDetailInfo } from "../shared-video-info";

function MockedVideoDetailInfo(props) {
  const [contextData, setContextData] = useState({});

  return (
    <AppContext.Provider value={{ contextData, setContextData }}>
      <BrowserRouter>
        <VideoDetailInfo {...props} />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

describe("Testing video information detail", () => {
  const videoInfo: VideoInfoDto = {
    videoId: "video id",
    url: "video url",
    title: "video title",
    description: "video description",
    owner: "video creator",
    channelId: "channel id",
    thumbnailUrl: "thumbnail url",
    datePublished: "date",
    id: "ent-id",
    modifiedAt: new Date(),
    createdAt: new Date(),
  };

  const renderComponent = () => render(<MockedVideoDetailInfo videoInfo={videoInfo} />);

  beforeEach(() => {
  });

  it("should render video information detail", async () => {
    renderComponent();
    expect(screen.getByText('video title')).toBeInTheDocument();
    expect(screen.getByText('video description')).toBeInTheDocument();
    expect(screen.getByText('video creator')).toBeInTheDocument();
  });
});
