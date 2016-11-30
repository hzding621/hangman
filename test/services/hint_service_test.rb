require 'test_helper'

class HintServiceTest < ActiveSupport::TestCase

  def setup
    @service = HintService.instance
  end

  test 'empty word' do
    # initial guess should be equal to the most frequency letter in words of correct length

    assert_equal 'a', @service.find_hint('_' * 4, '')
    assert_equal 'f', @service.find_hint('_' * 5,  '')
  end

  test 'missing one letter' do
    assert_equal 'b', @service.find_hint('a_cd', 'acd')
  end

  test 'multiple match take highest frequency' do
    assert_equal 'c', @service.find_hint('ab_____', 'ab')
  end
end
