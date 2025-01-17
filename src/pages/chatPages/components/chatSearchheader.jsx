export default function ChatHeaderSearch(){
    return(
        <div className="sticky-chat-header-top">
        <div className="header-top">
          <h4>Chats</h4>
          <span>
            <i className="fas fa-gear"></i>
          

          </span>

        </div>
        <div className="serach-span">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="search"/>
        </div>
        </div>
    )

}