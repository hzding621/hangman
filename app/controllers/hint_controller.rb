class HintController < ApplicationController
  def initialize
    @hint_service = HintService.instance
  end

  def hint
    pattern = params[:pattern]
    trials = params[:trials]

    hint = @hint_service.find_hint pattern, trials

    render(status: 200, json: {:hint => hint})
  end
end
