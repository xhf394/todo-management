<div>
	      <SortButton
            onSort={this.onSort}
            sortKey={'TITLE'}
            activeSortKey={sortKey}
	      >
	        Title
	      </SortButton>
	      <SortButton
            onSort={this.onSort}
            sortKey={'COMMENTS'}
            activeSortKey={sortKey}
	      >
	        Comments
	      </SortButton>
          <SortButton
            onSort={this.onSort}
            sortKey={'AUTHOR'}
            activeSortKey={sortKey}
          >
            Author
          </SortButton>
          <SortButton
            onSort={this.onSort}
            sortKey={'POINTS'}
            activeSortKey={sortKey}
          >
            Points
          </SortButton>    
	    </div>


      { {data.nasa_id} && <div key={data.nasa_id} >
                <span> 
                  <img src={links.href} alt=""/>
                </span>
                <span> {data.title} </span>
                <span> {data.secondary_creator} </span>
              </div>
      } 

      <MoreButtonWithConditionalRendering
          list={list}
          isLoading={isLoadingNASA}
          onClick={() => this.fetchTopStories(searchKeyText, page+1)}
          searchText={searchText}    
        >
          More
      </MoreButtonWithConditionalRendering> 